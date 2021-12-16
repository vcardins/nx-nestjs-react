import { Controller } from '@nestjs/common';

import { ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, AuthGroups } from '@xapp/shared/types';
import { OperationService } from './operation.service';
import { Operation } from './operation.entity';

const BaseController = baseAuthControllerFactory<Operation>({
	entity: Operation,
	entityOutput: Operation,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/operations')
@ResourceGroup(Resources.Operation)
export class OperationController extends BaseController {
	constructor(private readonly service: OperationService) {
		super(service);
	}
}
