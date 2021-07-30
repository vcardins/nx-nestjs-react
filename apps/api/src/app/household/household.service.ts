import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository, getRepository } from 'typeorm';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { MailService } from '@xapp/api/mail';
import { UserService } from '@xapp/api/access-control';
import { HouseholdOutput } from '@xapp/shared/types';
import { plainToClass } from 'class-transformer';

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

	async getMemberHouseholds(memberId: number): Promise<HouseholdOutput[]> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.members`, 'members');

		this.queryBuilder = this.queryBuilder.where('members.user_id = :id', {
			id: +memberId,
		});

		const items = await this.queryBuilder.getMany();

		return items.map((item) => plainToClass(HouseholdOutput, item));
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<Household> | Household[]> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.rooms`, 'rooms');
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.members`, 'members');

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.title like :q or ${this.modelName}.name like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}
}
