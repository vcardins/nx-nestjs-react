import { Controller, Get, Req, Response } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { baseAuthControllerFactory, ResourceGroup, getDefaultPermissions, Roles, Permissions, ApiException } from '@xapp/api/core';
import { SocketGateway } from '@xapp/api/socket';
import { Resources, TaskTemplateOutput, AuthGroups, Operations } from '@xapp/shared/types';
import { TaskTemplate } from './entities/task_template.entity';
import { TaskTemplateService } from './task_template.service';

const auth = getDefaultPermissions(AuthGroups.Admin);

const BaseController = baseAuthControllerFactory<TaskTemplate>({
	entity: TaskTemplate,
	entityOutput: TaskTemplateOutput,
	auth,
});

const event = (action: Operations) => `${Resources.TaskTemplate}:${action}`;

@ApiBearerAuth()
@Controller('/task-template')
@ResourceGroup(Resources.TaskTemplate)
export class TaskTemplateController extends BaseController {
	constructor(
		private readonly service: TaskTemplateService,
		private readonly socket: SocketGateway,
	) {
		super(service);

		this.service.afterCreate = (data: any) => socket.emit(event(Operations.Create), data);
		this.service.afterUpdate = (data: any) => socket.emit(event(Operations.Update), data);
		this.service.afterDelete = (data: any) => socket.emit(event(Operations.Delete), data);
	}

	@Get()
	@Roles(auth?.get?.roles)
	@Permissions(...auth?.get?.permissions)
	@ApiOkResponse({
		type: TaskTemplateOutput,
		isArray: true,
	})
	@ApiBadRequestResponse({ type: ApiException })
	public async getAll(@Req() req, @Response() response) {
		const result = await this.service.getMappedValues();

		return response.send(result);
	}
}
