import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService } from '@xapp/api/core';
import { TaskOutput } from '@xapp/shared/types';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService extends BaseService<Task> {
	items: Task[] = [];

	static modelName = 'task';

	constructor(
		@InjectRepository(Task) protected readonly repository: Repository<Task>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async findHouseholdTasks (householdId: number): Promise<TaskOutput[]> {
		this.queryBuilder = this
			.createQueryBuilder()
			.leftJoinAndSelect(`${this.modelName}.template`, 'template')
			.leftJoinAndSelect('task', 'taskTemplate', 'task.task_template_id = taskTemplate.id')
			.leftJoinAndSelect('task', 'household', 'task.household_id = household.id')
			.where('task.household_id = :id', { id: +householdId })
			.select([
				this.modelName,
				'taskTemplate',
			]);

		return plainToClass(TaskOutput, await this.queryBuilder.getMany());
	}

	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const tasks = await qb.getMany();
			this.items = plainToClass(Task, tasks);

			return this.items;
		}
	}
}
