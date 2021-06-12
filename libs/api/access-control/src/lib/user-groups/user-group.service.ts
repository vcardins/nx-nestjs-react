import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';
import { Group } from './user-group.entity';
import { IdType } from '@xapp/shared/types';

@Injectable()
export class GroupService extends BaseService<Group> {
	items: Group[] = [];

	static modelName = 'groups';

	constructor(
		@InjectRepository(Group) protected readonly repository: Repository<Group>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<Group> | Group[]> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission');

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.title like :q or ${this.modelName}.name like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}

	async findById(id: IdType, options?: FindOneOptions): Promise<Group> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission');

		return super.findById(id, options);
	}

	getGroupByName(name: string) {
		const groups = this.items.filter((group) => group.name === name);

		if (groups.length) {
			return groups[0];
		}

		throw new NotFoundException(`Group with name "${name}" does not exists`);
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const groups = await qb
				.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission')
				.getMany();


			this.items = plainToClass(Group, groups);

			// Logger.log(JSON.stringify(groups.map((group) => group.name)), GroupService.name);

			return this.items;
		}
	}
}
