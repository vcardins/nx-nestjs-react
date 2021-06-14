import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ResourceGroup, getDefaultPermissions } from '@xapp/api/core';
import { Resources, HouseholdOutput, UserRoles } from '@xapp/shared/types';

import { Household } from './entities/household.entity';
import { HouseholdService } from './household.service';

const BaseController = baseAuthControllerFactory<Household>({
	entity: Household,
	entityOutput: HouseholdOutput,
	auth: getDefaultPermissions([UserRoles.User]),
});

@ApiBearerAuth()
@Controller('/household')
@ResourceGroup(Resources.Household)
export class HouseholdController extends BaseController {
	constructor(
		private readonly service: HouseholdService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
