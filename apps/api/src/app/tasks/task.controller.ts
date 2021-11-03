import { Body, Controller, Get, InternalServerErrorException, Param, Post, Req, Response } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Entity } from 'typeorm';

import { SocketGateway } from '@xapp/api/socket';
import { baseAuthControllerFactory, ResourceGroup, getDefaultPermissions, ApiException, Roles, Permissions } from '@xapp/api/core';
import { Resources, Operations, TaskOutput, TaskInput, AuthGroups, TaskTemplateOutput } from '@xapp/shared/types';
import { getOperationId } from '@xapp/shared/utils';

import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

const auth = getDefaultPermissions(AuthGroups.User);

const BaseController = baseAuthControllerFactory<Task>({
	entity: Task,
	entityCreateInput: TaskInput,
	entityOutput: TaskOutput,
	auth,
});

const event = (action: Operations) => `${Resources.Task}:${action}`;

@ApiBearerAuth()
@Controller('/task')
@ResourceGroup(Resources.Task)
export class TaskController extends BaseController {
	constructor(
		private readonly service: TaskService,
		private readonly socket: SocketGateway,
	) {
		super(service);
		this.service.afterCreate = (data: any) => socket.emit(event(Operations.Create), data);
		this.service.afterUpdate = (data: any) => socket.emit(event(Operations.Update), data);
		this.service.afterDelete = (data: any) => socket.emit(event(Operations.Delete), data);
	}

	@Get(':householdId')
	@Roles(auth?.get?.roles)
	@Permissions(...auth?.get?.permissions)
	@ApiOkResponse({
		type: TaskTemplateOutput,
		isArray: true,
	})
	@ApiBadRequestResponse({ type: ApiException })
	public async getById(@Param('householdId') householdId: number, @Response() response) {
		try {
			const result = await this.service.findHouseholdTasks(householdId);
			return response.send(result);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Post()
	@Roles(auth?.create?.roles)
	@Permissions(...auth?.create?.permissions)
	@ApiBody({
		type: TaskInput,
		description: 'Data for entity creation',
		required: true,
		isArray: false,
	})
	@ApiCreatedResponse({ type: TaskOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, Operations.Create))
	public async create(@Req() req, @Body() body: TaskInput, @Response() response) {
		try {
			const task = plainToClass(Task, body);
			task.creatorUserId = req.user.id;
			task.householdId = body.householdId;

			const data = await this.service.create(task);

			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
