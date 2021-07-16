import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { plainToClassFromExist, plainToClass } from 'class-transformer';

import { CustomError, EventService } from '@xapp/api/core';
import { getUtcDate, randomAsciiString } from '@xapp/shared/utils';
import { MailService } from '@xapp/api/mail';
import { UserRoles, VerificationKeyPurpose } from '@xapp/shared/types';
import { RoleService } from '../../role/role.service';

import {
	AccountCreatedEvent,
	EmailVerifiedEvent,
	PasswordChangedEvent,
	PasswordResetRequestedEvent,
	AccountClosedEvent,
	AccountReopenedEvent,
	MobileVerifiedEvent,
} from './account.events';

import {
	VerifyPhoneNumberInput,
	SignUpInput,
	VerifyEmailInput,
	ChangePasswordInput,
	ResetPasswordInput,
	ForgotPasswordInput,
	ReopenAccountInput,
	UserProfileInput,
} from './dto';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/user_profile.entity';
import { UserProfileDto } from '../..';

const USER_NOT_FOUND = 'User not found';
const INVALID_CREDENTIALS = 'Invalid credentials';

@Injectable()
export class AccountService extends EventService { // implements IAccountService {
	constructor(
		private readonly userService: UserService,
		private readonly roleService: RoleService,
		private readonly emailService: MailService,
	) {
		super();
	}

	async createAccount(data: Omit<SignUpInput, 'confirmPassword'>): Promise<User> {
		try {
			await this.roleService.preloadAll();
		}
		catch (error) {
			throw new BadRequestException('Error in load roles');
		}

		await this.userService.assertEmail(data.email);

		const role = this.roleService.getRoleByName(UserRoles.User);
		const verification = this.setVerificationKey(VerificationKeyPurpose.ChangeEmail, data.email);
		const newUser = await plainToClass(User, {
			...data,
			...verification,
		}).setPassword(data.password);

		newUser.roles = [role];

		const userProfile = new UserProfile();
		userProfile.firstName = data.firstName;
		userProfile.lastName = data.lastName;
		newUser.userProfile = userProfile;

		const user = await this.userService.create(newUser);

		await this.emailService.send(user.email, 'Your account has been created', `<p>${verification.verificationKey}</p>`);


		this.addEvent(new AccountCreatedEvent(user, verification.verificationKey));
		this.raiseEvents();

		return user;
	}

	async requestAccountVerification(email: string): Promise<void> {
		const user = await this.userService.findByEmail(email);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		const verificationInfo = this.setVerificationKey(VerificationKeyPurpose.ChangeEmail, email);

		await this.completeUpdate(plainToClassFromExist(user, {
			...user,
			...verificationInfo,
		}));
	}

	async verifyAccountEmail(data: VerifyEmailInput): Promise<void> {
		const user = await this.userService.findByVerificationKey(data.key);

		if (!user) {
			throw new NotFoundException('Verification key invalid or expired');
		}

		const updatedUser = plainToClassFromExist(user, {
			...user,
			dateAccountVerified: getUtcDate(),
			isActive: true,
			verificationKey: null,
			verificationKeyPurpose: null,
			dateVerificationKeySent: null,
			verificationStorage: null,
		});

		this.addEvent(new EmailVerifiedEvent(updatedUser));

		await this.completeUpdate(updatedUser);
	}

	async verifyAccountPhoneNumber(data: VerifyPhoneNumberInput): Promise<void> {
		const user = await this.userService.findByPhoneVerificationCode(data.code);

		if (!user) {
			throw new NotFoundException('Verification code invalid or expired');
		}

		const updatedUser = plainToClassFromExist(user, {
			...user,
			phoneVerificationCodeDateSent: null,
			phoneVerificationCode: null,
		});

		this.addEvent(new MobileVerifiedEvent(updatedUser));

		await this.completeUpdate(updatedUser);
	}


	async changePassword(id: User['id'], data: ChangePasswordInput): Promise<void> {
		const user = await this.userService.findById(id);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		if (!(await user.validatePassword(data.oldPassword))) {
			throw new CustomError(INVALID_CREDENTIALS);
		}

		await user.setPassword(data.newPassword);

		this.addEvent(new PasswordChangedEvent(user, data.newPassword));

		await this.completeUpdate(user);
	}

	async resetPassword(data: ResetPasswordInput): Promise<void> {
		const user = await this.userService.findByVerificationKey(data.verificationKey);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		if (!(await user.validatePassword(data.password))) {
			throw new CustomError(INVALID_CREDENTIALS);
		}

		await user.setPassword(data.password);

		const updatedUser = plainToClassFromExist(user, {
			...user,
			dateAccountVerified: getUtcDate(),
			isActive: true,
			verificationKey: null,
			verificationKeyPurpose: null,
			dateVerificationKeySent: null,
			verificationStorage: null,
		});

		this.addEvent(new PasswordChangedEvent(updatedUser, data.password));

		await this.completeUpdate(updatedUser);
	}

	async forgotPassword(data: ForgotPasswordInput): Promise<void> {
		const user = await this.userService.findByEmail(data.email);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		const verificationInfo = this.setVerificationKey(
			!user.dateAccountVerified ? VerificationKeyPurpose.ChangeEmail : VerificationKeyPurpose.ResetPassword,
			user.email,
		);

		const updatedUser = { ...user, ...verificationInfo } as User;

		if (!user.dateAccountVerified) {
			this.addEvent(new AccountCreatedEvent(updatedUser, verificationInfo.verificationKey));
		}
		else {
			this.addEvent(new PasswordResetRequestedEvent(updatedUser, verificationInfo.verificationKey));
		}

		await this.completeUpdate(updatedUser);
	}

	private async completeUpdate(user: User) {
		await this.userService.update(user.id, user);
		this.raiseEvents();
	}

	async closeAccount(id: User['id']): Promise<void> {
		const user = await this.userService.findById(id);

		if (!user) {
			throw new NotFoundException('Verification key invalid or expired');
		}

		const updatedUser = plainToClassFromExist(user, {
			isActive: false,
			dateAccountClosed: getUtcDate(),
		});

		this.addEvent(new AccountClosedEvent(updatedUser));

		await this.completeUpdate(updatedUser);
	}

	async reopenAccount(data: ReopenAccountInput): Promise<void> {
		const user = await this.userService.findByEmail(data.email);

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		if (!(await user.validatePassword(data.password))) {
			throw new CustomError(INVALID_CREDENTIALS);
		}

		const verification = this.setVerificationKey(VerificationKeyPurpose.ChangeEmail, data.email);

		const updatedUser = plainToClassFromExist(user, {
			...verification,
			isActive: true,
			dateAccountClosed: null,
		});

		this.addEvent(new AccountReopenedEvent(updatedUser, verification.verificationKey));

		await this.completeUpdate(updatedUser);
	}

	async update(id: number, user: User) {
		await this.userService.assertEmail(user.email, id);

		const foundUser = await this.userService.findById(id);

		const updatedUser = plainToClassFromExist(foundUser, {
			email: foundUser.email,
			hashedPassword: foundUser.hashedPassword,
			firstName: foundUser.userProfile.firstName,
			lastName: foundUser.userProfile.lastName,
		});

		await updatedUser.setPassword(updatedUser.hashedPassword);

		return this.userService.update(id, user);
	}

	async updateProfile(id: number, userProfile: UserProfileInput): Promise<UserProfileDto> {
		const foundUser = await this.userService.findById(id);
		const updatedUser = {
			...foundUser,
			userProfile: plainToClassFromExist(foundUser.userProfile, userProfile),
		};

		const user = await this.userService.update(id, updatedUser);

		return this.userService.getUserDto(user)?.profile;
	}

	private setVerificationKey(verificationKeyPurpose: VerificationKeyPurpose, state: string): Partial<User> {
		const verificationKey = randomAsciiString(48);

		return {
			dateAccountVerified: null,
			isActive: false,
			dateVerificationKeySent: getUtcDate(),
			verificationKey,
			verificationKeyPurpose,
			verificationStorage: state,
		};
	}
}
