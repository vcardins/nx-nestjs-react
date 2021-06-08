import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService, IFindAndCountResult, IPaginationQuery } from '@xapp/api/core';
import { TaskTemplate } from './entities/task_template.entity';

@Injectable()
export class TaskTemplateService extends BaseService<TaskTemplate> {
	items: TaskTemplate[] = [];

	static modelName = 'tasks';

	constructor(
		@InjectRepository(TaskTemplate) protected readonly repository: Repository<TaskTemplate>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findAndCount (options: IPaginationQuery): Promise<IFindAndCountResult<TaskTemplate> | TaskTemplate[]> {
		this.queryBuilder = this.createQueryBuilder();

		if (options.q) {
			this.queryBuilder = this.queryBuilder.where(`${this.modelName}.name like :q or ${this.modelName}.name like :q or ${this.modelName}.id = :id`, {
				q: `%${options.q}%`,
				id: +options.q,
			});
		}

		return super.findAndCount(options);
	}

	getTaskTemplateByName(name: string) {
		const tasks = this.items.filter((group) => group.name === name);

		if (tasks.length) {
			return tasks[0];
		}

		throw new NotFoundException(`Template with name "${name}" does not exists`);
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const tasks = await qb
				.getMany();


			this.items = plainToClass(TaskTemplate, tasks);

			return this.items;
		}
	}
}
