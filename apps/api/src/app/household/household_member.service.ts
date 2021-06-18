import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { EventService, getUtcDate, randomAsciiString } from '@xapp/api/core';

import { HouseholdInvitationAcceptance, HouseholdInvitationInput, HouseholdInvitationOutput, HouseholdInvitationWelcome, HouseholdMemberSignup } from '@xapp/shared/types';
import { MailService } from '@xapp/api/mail';
import { User, UserService } from '@xapp/api/access-control';

import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';

import { MemberInvitedEvent, MemberAddedEvent } from './household.events';
import { AuthService } from '@xapp/api/auth';

@Injectable()
export class HouseholdMemberService extends EventService {
	constructor(
		@InjectRepository(HouseholdMemberInvitation) protected readonly repositoryMemberInvitation: Repository<HouseholdMemberInvitation>,
		@InjectRepository(HouseholdMember) protected readonly repositoryHouseholdMember: Repository<HouseholdMember>,
		@InjectRepository(Household) protected readonly repositoryHousehold: Repository<Household>,
		@InjectRepository(User) protected readonly repositoryUser: Repository<User>,
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly emailService: MailService,
	) {
		super();
	}

	async sendInvitation(model: HouseholdInvitationInput): Promise<HouseholdInvitationOutput> {
		try {
			const newMemberInvitation = plainToClass(HouseholdMemberInvitation, model);

			const found = await this.repositoryMemberInvitation.findOne({ where: { email: model.email } });

			if (found) {
				throw new ConflictException('An invitation for this user has already been sent');
			}

			const household = await this.repositoryHousehold.findOne(model.householdId);
			const user = await this.repositoryUser.findOne(model.inviterId);

			if (!household || !user) {
				throw new NotFoundException('House hold not found');
			}

			newMemberInvitation.invitationCode = randomAsciiString(48);
			newMemberInvitation.household = household;
			newMemberInvitation.senderUser = user;

			const invitation = await this.repositoryMemberInvitation.save(newMemberInvitation);
			const subject = `${invitation.firstName}, you were invited to join the ${household.name} household`;;
			const message = `<p>${invitation.firstName}, please click <a href="${invitation.invitationCode}">here</a> to join the ${household.name} household</p>`;

			await this.emailService.send(invitation.email, subject, message);

			const event = new HouseholdInvitationOutput(invitation.invitationCode, invitation.firstName, message);

			this.addEvent(new MemberInvitedEvent(household, event));
			this.raiseEvents();

			return event;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async findInvitationByCode(invitationCode: string): Promise<HouseholdInvitationWelcome> {
		try {
			const invitation = await this.repositoryMemberInvitation.findOne({
				where: { invitationCode },
				relations: ['household', 'senderUser'],
			});

			if (!invitation) {
				throw new NotFoundException('The invitation was not found or is expired');
			}

			const { firstName, email, dateCreated, dateAccepted, senderUser, household } = invitation;
			const response = new HouseholdInvitationWelcome();

			response.invitee = { firstName, email };
			response.inviter = {
				firstName: senderUser.userProfile.firstName,
				lastName: senderUser.userProfile.lastName,
				pictureUrl: senderUser.userProfile.pictureUrl,
			};
			response.household = household.name;
			response.dateCreated = dateCreated.toUTCString();
			response.dateAccepted = dateAccepted?.toUTCString();

			return response;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async acceptInvitation(model: HouseholdInvitationAcceptance) {
		try {
			const invitation = await this.repositoryMemberInvitation.findOne(
				{ where: { invitationCode: model.invitationCode } },
			);

			if (!invitation) {
				throw new NotFoundException('Invitation was not found or is expired');
			}

			invitation.dateAccepted = getUtcDate();
			await this.repositoryMemberInvitation.save(invitation);

			const user = await this.userService.findById(model.userId);

			const newMember = plainToClass(HouseholdMember, {
				household: invitation.household,
				user,
				isOwner: false,

			});

			await this.repositoryHouseholdMember.save(newMember);

			return null;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async create(entity: HouseholdMember) {
		return await this.repositoryHouseholdMember.save(entity);
	}

	async addMemberByInvitation(model: HouseholdMemberSignup) {
		try {
			const invitation = await this.repositoryMemberInvitation.findOne(
				{ where: { invitationCode: model.invitationCode }, relations: ['household'] },
			);

			if (!invitation) {
				throw new NotFoundException('Invitation was not found or is expired');
			}

			await this.repositoryMemberInvitation.save({ ...invitation, dateAccepted: getUtcDate() });

			const user = await this.authService.signUp(model);

			const newMember = plainToClass(HouseholdMember, {
				household: invitation.household,
				user,
				isOwner: false,
				isDefault: true,

			});

			await this.repositoryHouseholdMember.save(newMember);

			this.addEvent(new MemberAddedEvent(invitation.household, newMember));

			// await this.emailService.send(user.email, 'Your account has been created', `<p>${user.userProfile.firstName} Member has been added</p>`);
			this.raiseEvents();
		}
		catch (error) {
			throw new BadRequestException(error);
		}
	}
}
