import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository, getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { BaseService } from '@xapp/api/core';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { MailService } from '@xapp/api/mail';
import { UserService } from '@xapp/api/access-control';
import { HouseholdOutput } from '@xapp/shared/types';

@Injectable()
export class HouseholdService extends BaseService<Household> {
	static modelName = 'household';
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

	async getUserHouseholds(memberId: number): Promise<HouseholdOutput[]> {
		this.queryBuilder = this
			.createQueryBuilder()
			.leftJoinAndSelect(`${this.modelName}.members`, 'members')
			.leftJoinAndSelect(`${this.modelName}.rooms`, 'rooms')
			.leftJoinAndSelect('members.user', 'user', 'members.userId = user.id')
			.leftJoinAndSelect('rooms.roomType', 'roomType', 'rooms.roomTypeId = roomType.id')
			.leftJoinAndSelect('user.userProfile', 'profile')
			.where('members.user_id = :id', { id: +memberId })
			.orderBy('rooms.custom_name', 'ASC')
			.addOrderBy('roomType.name', 'ASC')
			.select([
				this.modelName,
				'members.id',
				'members.isDefault',
				'members.type',
				'members.userId',
				'rooms',
				'roomType.name',
				'roomType.description',
				'user.email',
				'user.lastLogin',
				'user.phoneNumber',
				'profile.firstName',
				'profile.lastName',
			]);
		const items = await this.queryBuilder.getMany();

		return plainToClass(HouseholdOutput, items);
	}
}
