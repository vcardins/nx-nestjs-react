import { Controller } from '@nestjs/common';

import { Resources, AuthGroups } from '@xapp/shared/types';
import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';

import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { PermissionOutput } from './dto/permission.output';

const BaseController = baseAuthControllerFactory<Permission>({
	entity: Permission,
	entityOutput: PermissionOutput,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/permissions')
@ResourceGroup(Resources.Permission)
export class PermissionController extends BaseController {
	constructor(private readonly service: PermissionService) {
		super(service);
	}
}
