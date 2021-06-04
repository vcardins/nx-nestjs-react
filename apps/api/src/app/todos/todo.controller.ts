import { Controller, Patch, Body, Response, InternalServerErrorException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { Entity } from 'typeorm';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup, getUtcDate, Roles, Permissions, ApiException, SortDirection } from '@xapp/api/core';
import { getOperationId } from '@xapp/shared/utils';
import { ModuleAction, ModuleName } from '@xapp/shared';

import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { TodoOutput } from './dto/todo.output';
import { ITodoComplete } from './todo-complete.interface';

const roles = [];
const auth = {
	count: { roles, permissions: [ModuleAction.Read] },
	get: { roles, permissions: [ModuleAction.Read] },
	getById: { roles, permissions: [ModuleAction.Read] },
	create: { roles, permissions: [ModuleAction.Create] },
	update: { roles, permissions: [ModuleAction.Update] },
	updateOrCreate: { roles, permissions: [ModuleAction.Update] },
	delete: { roles, permissions: [ModuleAction.Delete] },
};

const BaseController = baseAuthControllerFactory<Todo>({
	entity: Todo,
	entityOutput: TodoOutput,
	auth,
});

@ApiBearerAuth()
@Controller('/todo')
@ModuleGroup(ModuleName.Todo)
export class TodoController extends BaseController {
	constructor(
		private readonly service: TodoService,
		private readonly socketService: SocketGateway,
	) {
		super(
			service,
			socketService,
			{ sortBy: { dateCompleted: SortDirection.DESC, dateCreated: SortDirection.DESC } },
		);
	}
	beforeCreate(body: Todo): Promise<void> {
		body.dateCreated = getUtcDate();
		return;
	}

	@Patch('complete')
	@Roles(...roles)
	@Permissions(...auth?.update?.permissions)
	@ApiBody({
		type: Todo,
		description: 'Data for entity update',
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
