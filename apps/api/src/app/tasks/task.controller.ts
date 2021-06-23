import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ResourceGroup, getDefaultPermissions } from '@xapp/api/core';
import { Resources, TaskOutput, UserRoles } from '@xapp/shared/types';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

const BaseController = baseAuthControllerFactory<Task>({
	entity: Task,
	entityOutput: TaskOutput,
	auth: getDefaultPermissions([UserRoles.Admin]),
});

@ApiBearerAuth()
@Controller('/task')
@ResourceGroup(Resources.Task)
export class TaskController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: TaskService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
