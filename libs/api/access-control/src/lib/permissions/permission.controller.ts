import { Controller } from '@nestjs/common';

import { ModuleName, UserGroup } from '@xapp/shared/types';
import { ModuleGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionOutput } from './dto/permission.output';

const BaseController = baseAuthControllerFactory<Permission>({
	entity: Permission,
	entityOutput: PermissionOutput,
	auth: getDefaultPermissions([UserGroup.Admin]),
});

@Controller('/permissions')
@ModuleGroup(ModuleName.Permission)
export class PermissionController extends BaseController {
	constructor(private readonly service: PermissionService) {
		super(service);
	}
}
