import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup, getDefaultPermissions } from '@xapp/api/core';
import { ModuleName, TaskOutput, UserRole } from '@xapp/shared/types';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

const BaseController = baseAuthControllerFactory<Task>({
	entity: Task,
	entityOutput: TaskOutput,
	auth: getDefaultPermissions([UserRole.User]),
});

@ApiBearerAuth()
@Controller('/task')
@ModuleGroup(ModuleName.Task)
export class TaskController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: TaskService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
