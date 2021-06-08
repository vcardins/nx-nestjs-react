import { Controller } from '@nestjs/common';

import { ModuleName, UserGroup } from '@xapp/shared/types';

import { ModuleGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserOutput } from './dto/user.output';

const BaseController = baseAuthControllerFactory<User>({
	entity: User,
	entityOutput: UserOutput,
	auth: getDefaultPermissions([UserGroup.Admin]),
});

@Controller('/users')
@ModuleGroup(ModuleName.User)
export class UserController extends BaseController {
	constructor(private readonly service: UserService) {
		super(service);
	}
}
