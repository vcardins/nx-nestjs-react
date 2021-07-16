import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';

import { HouseholdRoom } from './entities/household_room.entity';
import { MailService } from '@xapp/api/mail';

@Injectable()
export class HouseholdRoomService extends BaseService<HouseholdRoom> {
	constructor(
		@InjectRepository(HouseholdRoom) protected readonly repository: Repository<HouseholdRoom>,
		@InjectMapper() autoMapper,
		private readonly emailService: MailService,
	) {
		super(repository, autoMapper);
	}

	async findByHousehold(householdId: number, roomTypeId: number): Promise<HouseholdRoom> {
		return this.repository.findOne({
			where: { householdId, roomTypeId },
		});
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<HouseholdRoom> | HouseholdRoom[]> {
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
