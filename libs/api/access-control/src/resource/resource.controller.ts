import { Controller } from '@nestjs/common';

import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, AuthGroups } from '@xapp/shared/types';

import { ResourceService } from './resource.service';
import { Resource } from './resource.entity';

const BaseController = baseAuthControllerFactory<Resource>({
	entity: Resource,
	entityOutput: Resource,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/resources')
@ResourceGroup(Resources.Resource)
export class ResourceController extends BaseController {
	constructor(readonly service: ResourceService) {
		super(service);
	}
}
