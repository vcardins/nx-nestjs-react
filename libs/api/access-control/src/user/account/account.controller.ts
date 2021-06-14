import { Body, Controller, HttpCode, HttpStatus, Post, Req, Patch, UseInterceptors, UploadedFile, Delete, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';

import { MessageOutput, Public, Roles, Permissions } from '@xapp/api/core';
import { Operations, UserRoles } from '@xapp/shared/types';

import { SignUpInput } from './dto/signup.input';
import { AccountOutput } from './dto/account.output';
import { ChangePasswordInput } from './dto/change-password.input';
import { UserProfileInput } from './dto/user-profile.input';

import { ResetPasswordInput } from './dto/reset-password.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ReopenAccountInput } from './dto/reopen-account.input';
import { VerifyEmailInput } from './dto/verify-email.input';
import { VerifyPhoneNumberInput } from './dto/verify-phone-number.input';
import { AccountService } from './account.service';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@ApiTags('account')
@Controller('/account')
export class AccountController {
	constructor(
		private accountService: AccountService,
		private readonly userService: UserService,
	) {}

	@Public()
	@HttpCode(HttpStatus.CREATED)
	@Post('signup')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: `API View that receives a POST with a user's username and password.
Returns a JSON Web Token that can be used for authenticated requests.`,
	})
	async createAccount(@Body() signUpDto: SignUpInput) {
		const user = await this.accountService.createAccount(signUpDto);

		if (user) {
			return {
				message: 'Your account has been created. Please, check your inbox and verify your email',
				data: user.verificationKey,
			};
		}
	}

	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@Get('info')
	@ApiResponse({
		status: HttpStatus.OK,
		type: UserDto,
		description: 'API View that checks the veracity of a token, returning the token if it is valid.',
	})
	async getUserInfo(@Req() req): Promise<UserDto> {
		const user = await this.userService.findById(req.user?.id);
		return this.userService.getUserDto(user);
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@HttpCode(HttpStatus.OK)
	@Patch('/profile')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async patchUserProfile(@Req() req, @Body() model: UserProfileInput) {
		return await this.accountService.updateProfile(req.user?.id, model);
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@HttpCode(HttpStatus.OK)
	@Patch('/change-password')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async pathChangePassword(@Req() req, @Body() model: ChangePasswordInput) {
		await this.accountService.changePassword(req.user?.id, model);
		return { message: 'Your password was successfully updated' };
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/forgot-password')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async postForgotPassword(@Req() req, @Body() info: ForgotPasswordInput) {
		await this.accountService.forgotPassword(info);
		return { message: 'Please check your email' };
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post('/reset-password')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async postResetPassword(@Req() req, @Body() info: ResetPasswordInput) {
		await this.accountService.resetPassword(info);
		return { message: 'Your password was successfully reset' };
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Patch('/verify/email')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async patchVerifyAccountEmail(@Req() req, @Body() model: VerifyEmailInput) {
		await this.accountService.verifyAccountEmail(model);
		return { message: 'Your email has been successfully verified' };
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Patch('/verify/phone')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async patchVerifyAccountPhoneNumber(@Req() req, @Body() model: VerifyPhoneNumberInput) {
		await this.accountService.verifyAccountPhoneNumber(model);
		return { message: 'Your phone number has been successfully verified' };
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@HttpCode(HttpStatus.OK)
	@Patch('/close')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async pathCloseAccount(@Req() req) {
		await this.accountService.closeAccount(req.user?.id);
		return { message: 'Your account was successfully closed' };
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Patch('/reopen')
	@ApiResponse({
		status: HttpStatus.OK,
		type: MessageOutput,
		description: '',
	})
	async pathReopenAccount(@Req() req, @Body() signInDto: ReopenAccountInput) {
		await this.accountService.reopenAccount(signInDto);
		return { message: 'Your account was successfully reopened' };
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@Permissions(Operations.Update)
	@HttpCode(HttpStatus.OK)
	@Post('/update')
	@ApiResponse({
		status: HttpStatus.OK,
		type: AccountOutput,
		description: '',
	})
	async update(@Req() req, @Body() accountDto: SignUpInput) {
		return plainToClass(
			AccountOutput,
			await this.accountService.update(req.user?.id, plainToClass(User, accountDto)),
		);
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@Permissions(Operations.Update)
	@HttpCode(HttpStatus.OK)
	@ApiConsumes('multipart/form-data')
	@Post('/avatar')
	@UseInterceptors(FileInterceptor('file'))
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Add avatar',
	})
	async updateAvatar(@Req() req, @UploadedFile() file: any) { // Express.Multer.File
		return this.userService.addAvatar(req.user.id, file.buffer, file.originalname);
	}

	@ApiBearerAuth()
	@Roles(UserRoles.Admin)
	@Permissions(Operations.Update)
	@HttpCode(HttpStatus.OK)
	@Delete('avatar')
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Delete avatar',
	})
	async deleteAvatar(@Req() req) {
		return this.userService.deleteAvatar(req.user.id);
	}
}
