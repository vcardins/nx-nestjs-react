import { Controller } from '@nestjs/common';

import { SocketGateway, ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, UserRoles } from '@xapp/shared/types';
import { ResourceService } from './resource.service';
import { Resource } from './resource.entity';

const BaseController = baseAuthControllerFactory<Resource>({
	entity: Resource,
	entityOutput: Resource,
	auth: getDefaultPermissions([UserRoles.Admin]),
});

@Controller('/resources')
@ResourceGroup(Resources.Admin)
export class ResourceController extends BaseController {
	constructor(
		private readonly service: ResourceService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
