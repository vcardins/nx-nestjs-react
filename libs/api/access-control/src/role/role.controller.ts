import { Controller } from '@nestjs/common';

import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, AuthGroups } from '@xapp/shared/types';

import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleOutput } from './dto/role.output';

const BaseController = baseAuthControllerFactory<Role>({
	entity: Role,
	entityOutput: RoleOutput,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/roles')
@ResourceGroup(Resources.Role)
export class RoleController extends BaseController {
	constructor(private readonly service: RoleService) {
		super(service);
	}
}
