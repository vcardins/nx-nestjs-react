import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';

import { BaseService } from '@xapp/api/core';
import { getUtcDate } from '@xapp/shared/utils';

import { ITodoComplete } from './todo-complete.interface';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService extends BaseService<Todo> {
	constructor(
		@InjectRepository(Todo) protected readonly repository: Repository<Todo>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}

	async completeTodo(model: ITodoComplete) {
		return this.update(model.id, { completedAt: !model.setIncomplete ? getUtcDate() : null });
	}
}
