import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup, getDefaultPermissions } from '@xapp/api/core';
import { ModuleName, TaskTemplateOutput, UserGroup } from '@xapp/shared/types';
import { TaskTemplate } from './entities/task_template.entity';
import { TaskTemplateService } from './task_template.service';

const BaseController = baseAuthControllerFactory<TaskTemplate>({
	entity: TaskTemplate,
	entityOutput: TaskTemplateOutput,
	auth: getDefaultPermissions([UserGroup.User]),
});

@ApiBearerAuth()
@Controller('/task-template')
@ModuleGroup(ModuleName.TaskTemplate)
export class TaskTemplateController extends BaseController {
	constructor(
		private readonly service: TaskTemplateService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
