import { Controller } from '@nestjs/common';

import { ModuleAction, ModuleName } from '@xapp/shared';

import { ModuleGroup, baseAuthControllerFactory } from '@xapp/api/core';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserOutput } from './dto/user.output';

const roles = ['isSuperuser'];

const BaseController = baseAuthControllerFactory<User>({
	entity: User,
	entityOutput: UserOutput,
	auth: {
		count: { roles, permissions: [ModuleAction.Read] },
		get: { roles, permissions: [ModuleAction.Read] },
		getById: { roles, permissions: [ModuleAction.Read] },
		create: { roles, permissions: [ModuleAction.Create] },
		update: { roles, permissions: [ModuleAction.Update] },
		updateOrCreate: { roles, permissions: [ModuleAction.Create] },
		delete: { roles, permissions: [ModuleAction.Delete] },
	},
});

@Controller('/users')
@ModuleGroup(ModuleName.User)
export class UserController extends BaseController {
	constructor(private readonly service: UserService) {
		super(service);
	}
}
