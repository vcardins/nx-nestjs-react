import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { IdType } from '@xapp/shared/types';
import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';

import { Operation } from './operation.entity';

@Injectable()
export class OperationService extends BaseService<Operation> {
	items: Operation[] = [];

	static modelName = 'operations';

	constructor(
		@InjectRepository(Operation) protected readonly repository: Repository<Operation>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<Operation> | Operation[]> {
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

	async findById(id: IdType, options?: FindOneOptions): Promise<Operation> {
		this.queryBuilder = this.createQueryBuilder();
		this.queryBuilder = this.queryBuilder.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission');

		return super.findById(id, options);
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const operations = await qb
				.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission')
				.getMany();


			this.items = plainToClass(Operation, operations);

			// Logger.log(JSON.stringify(operations.map((group) => group.name)), OperationService.name);

			return this.items;
		}
	}
}
