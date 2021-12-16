import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService extends BaseService<Permission> {
	constructor(
		@InjectRepository(Permission)
		protected readonly repository: Repository<Permission>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findById(id: number) {
		return super.findById(id);
	}

	async findAndCount (options: IPaginationQuery & { role: string; resource: string }): Promise<IFindAndCountResult<Permission> | Permission[]> {
		this.queryBuilder = this.createQueryBuilder();

		if (options.role) {
			this.queryBuilder = this.queryBuilder.leftJoin(`${this.modelName}.roles', 'role').where('role.id = :role`, options.role);
		}

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.name like :q or ${this.modelName}.title like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		if (options.resource) {
			this.queryBuilder = this.queryBuilder.where('resource = :resource', {
				resource: options.resource,
			});
		}

		return await super.findAndCount(options);
	}
}
