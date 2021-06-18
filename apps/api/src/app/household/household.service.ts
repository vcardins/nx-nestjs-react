import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository, getRepository } from 'typeorm';

import { BaseService } from '@xapp/api/core';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { MailService } from '@xapp/api/mail';
import { UserService } from '@xapp/api/access-control';

@Injectable()
export class HouseholdService extends BaseService<Household> {
	householdMembersRepository: Repository<HouseholdMember>;

	constructor(
		@InjectRepository(Household) protected readonly repository: Repository<Household>,
		private readonly userService: UserService,
		@InjectMapper() autoMapper,
		private readonly emailService: MailService,
	) {
		super(repository, autoMapper);
		this.householdMembersRepository = getRepository(HouseholdMember);
	}

	async findByName(name: string): Promise<Household> {
		return this.repository.findOne({
			where: { name },
		});
	}
}
