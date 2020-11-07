import { Controller } from '@nestjs/common';

import { ModuleAction, ModuleName } from '@xapp/shared/enums';
import { ModuleGroup, baseAuthControllerFactory } from '@xapp/api/core';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionOutput } from './dto/permission.output';

const roles = ['isSuperuser'];

const BaseController = baseAuthControllerFactory<Permission>({
	entity: Permission,
	entityOutput: PermissionOutput,
	auth: {
		count: { roles, permissions: [ModuleAction.Read]},
		get: { roles, permissions: [ModuleAction.Read]},
		getById: { roles, permissions: [ModuleAction.Read]},
		create: { roles, permissions: [ModuleAction.Create]},
		update: { roles, permissions: [ModuleAction.Update]},
		updateOrCreate: { roles, permissions: [ModuleAction.Create]},
		delete: { roles, permissions: [ModuleAction.Delete]},
	},
});

@Controller('/permissions')
@ModuleGroup(ModuleName.Permission)
export class PermissionController extends BaseController {
	constructor(private readonly service: PermissionService) {
		super(service);
	}
}
