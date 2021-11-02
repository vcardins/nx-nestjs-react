import { Controller, Patch, Body, Response, InternalServerErrorException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { Entity } from 'typeorm';

import { baseAuthControllerFactory, ResourceGroup, Permissions, ApiException, getDefaultPermissions } from '@xapp/api/core';
import { getOperationId, getUtcDate } from '@xapp/shared/utils';
import { Resources, AuthGroups, SortDirections } from '@xapp/shared/types';

import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoOutput } from './dto/todo.output';
import { ITodoComplete } from './todo-complete.interface';
import { SocketService } from '@xapp/api/socket';

const auth = getDefaultPermissions(AuthGroups.User);

const BaseController = baseAuthControllerFactory<Todo>({
	entity: Todo,
	entityOutput: TodoOutput,
	auth,
});

@ApiBearerAuth()
@Controller('/todo')
@ResourceGroup(Resources.Todo)
export class TodoController extends BaseController {
	constructor(
		private readonly service: TodoService,
		private readonly socketService: SocketService,
	) {
		super(
			service,
			socketService,
			{ sortBy: { completedAt: SortDirections.DESC, createdAt: SortDirections.DESC } },
		);
	}

	beforeCreate(body: any): Promise<void> {
		return new Promise((resolve) => {
			body.createdAt = getUtcDate();
			resolve();
		});
	}

	@Patch('complete')
	@Permissions(...auth?.update?.permissions)
	@ApiBody({
		type: Todo,
		required: true,
		isArray: false,
	})
	@ApiOkResponse({ type: TodoOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Complete Todo'))
	public async complete(@Body() model: ITodoComplete, @Response() response) {
		try {
			const data = await this.service.completeTodo(model);

			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
