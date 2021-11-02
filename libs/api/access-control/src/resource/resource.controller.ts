import { Controller } from '@nestjs/common';

import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, AuthGroups } from '@xapp/shared/types';
import { ResourceService } from './resource.service';
import { Resource } from './resource.entity';
import { SocketService } from '@xapp/api/socket';

const BaseController = baseAuthControllerFactory<Resource>({
	entity: Resource,
	entityOutput: Resource,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/resources')
@ResourceGroup(Resources.Admin)
export class ResourceController extends BaseController {
	constructor(
		private readonly service: ResourceService,
		private readonly socketService: SocketService,
	) {
		super(service, socketService);
	}
}
