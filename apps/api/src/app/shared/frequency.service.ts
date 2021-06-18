import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';
import { Frequency } from './entities/frequency.entity';
import { FrequencyOutput } from '@xapp/shared/types';

@Injectable()
export class FrequencyService extends BaseService<Frequency> {
	items: Frequency[] = [];

	static modelName = 'frequency';

	constructor(
		@InjectRepository(Frequency) protected readonly repository: Repository<Frequency>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	public async getAll(): Promise<FrequencyOutput[]> {
		const items = await this.find();
		return items.map((item) => plainToClass(FrequencyOutput, item));
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<Frequency> | Frequency[]> {
		this.queryBuilder = this.createQueryBuilder();

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.name like :q or ${this.modelName}.name like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}

	getFrequencyByName(name: string) {
		const tasks = this.items.filter((group) => group.name === name);

		if (tasks.length) {
			return tasks[0];
		}

		throw new NotFoundException(`Frequency with name "${name}" does not exists`);
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const tasks = await qb
				.getMany();


			this.items = plainToClass(Frequency, tasks);

			return this.items;
		}
	}
}
