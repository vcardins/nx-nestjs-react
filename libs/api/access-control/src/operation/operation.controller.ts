import { Controller } from '@nestjs/common';

import { SocketGateway, ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, UserRoles } from '@xapp/shared/types';
import { OperationService } from './operation.service';
import { Operation } from './operation.entity';

const BaseController = baseAuthControllerFactory<Operation>({
	entity: Operation,
	entityOutput: Operation,
	auth: getDefaultPermissions([UserRoles.Admin]),
});

@Controller('/operations')
@ResourceGroup(Resources.Operation)
export class OperationController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: OperationService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
