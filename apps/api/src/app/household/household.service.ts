import { BadGatewayException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository, getRepository } from 'typeorm';

import { BaseService, IEvent } from '@xapp/api/core';

import { Household } from './entities/household.entity';
import { HouseholdMembers } from './entities/household_members.entity';
import { HouseholdMemberInput } from '@xapp/shared/types';
import { plainToClass } from 'class-transformer';
import { MailService } from '@xapp/api/mail';
import { UserService } from '@xapp/api/users';
import { MemberAddedEvent } from './household.events';

@Injectable()
export class HouseholdService extends BaseService<Household> {
	events: IEvent[] = []
	householdMembersRepository: Repository<HouseholdMembers>;

	constructor(
		@InjectRepository(Household) protected readonly repository: Repository<Household>,
		private readonly userService: UserService,
		@InjectMapper() autoMapper,
		private readonly emailService: MailService,
	) {
		super(repository, autoMapper);
		this.householdMembersRepository = getRepository(HouseholdMembers);
	}

	async addMember(model: HouseholdMemberInput) {
		const newMember = plainToClass(HouseholdMembers, model);
		const user = await this.userService.findById(model.userId);
		const household = await this.findById(model.id);

		if (!user) {
			throw new NotFoundException();
		}

		try {
			await this.emailService.send(user.email, 'Your account has been created', `<p>${user.userProfile.firstName} Member has been added</p>`);

			await this.householdMembersRepository.save(newMember);

			this.addEvent(new MemberAddedEvent(user, household));
			this.raiseEvents();
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	private addEvent(event: IEvent) {
		this.events.push(event);
	}
	private raiseEvents() {
		this.events.forEach((event) => {
			if (event instanceof MemberAddedEvent) {
				return Logger.log(event.member, 'MemberAddedEvent');
			}
		});
	}
}
