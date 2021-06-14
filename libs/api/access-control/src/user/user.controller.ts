import { Controller } from '@nestjs/common';

import { Resources, UserRoles } from '@xapp/shared/types';

import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserOutput } from './dto/user.output';

const BaseController = baseAuthControllerFactory<User>({
	entity: User,
	entityOutput: UserOutput,
	auth: getDefaultPermissions([UserRoles.Admin]),
});

@Controller('/users')
@ResourceGroup(Resources.User)
export class UserController extends BaseController {
	constructor(private readonly service: UserService) {
		super(service);
	}
}
