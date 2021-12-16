import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { IdType, UserRoles } from '@xapp/shared/types';
import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';

import { Role } from './role.entity';

@Injectable()
export class RoleService extends BaseService<Role> {
	items: Role[] = [];

	static modelName = 'roles';

	constructor(
		@InjectRepository(Role) protected readonly repository: Repository<Role>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<Role> | Role[]> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission');

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}

	async findById(id: IdType, options?: FindOneOptions): Promise<Role> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission');

		return super.findById(id, options);
	}

	getRoleByName(id: UserRoles) {
		const roles = this.items.filter((group) => group.id === id);

		if (roles.length) {
			return roles[0];
		}

		throw new NotFoundException(`Role with id "${name}" does not exists`);
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const roles = await qb
				.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission')
				.getMany();


			this.items = plainToClass(Role, roles);

			// Logger.log(JSON.stringify(roles.map((group) => group.name)), RoleService.name);

			return this.items;
		}
	}
}
