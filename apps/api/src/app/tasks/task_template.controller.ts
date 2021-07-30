import { Controller, Get, Req, Response } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ResourceGroup, getDefaultPermissions, Roles, Permissions, ApiException } from '@xapp/api/core';
import { Resources, TaskTemplateOutput, AuthGroups } from '@xapp/shared/types';
import { TaskTemplate } from './entities/task_template.entity';
import { TaskTemplateService } from './task_template.service';

const auth = getDefaultPermissions(AuthGroups.Admin);

const BaseController = baseAuthControllerFactory<TaskTemplate>({
	entity: TaskTemplate,
	entityOutput: TaskTemplateOutput,
	auth,
});

@ApiBearerAuth()
@Controller('/task-template')
@ResourceGroup(Resources.TaskTemplate)
export class TaskTemplateController extends BaseController {
	constructor(
		private readonly service: TaskTemplateService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
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
