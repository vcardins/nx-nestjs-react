import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup, getDefaultPermissions } from '@xapp/api/core';
import { ModuleName, HouseholdOutput, UserRole } from '@xapp/shared/types';

import { Household } from './entities/household.entity';
import { HouseholdService } from './household.service';

const BaseController = baseAuthControllerFactory<Household>({
	entity: Household,
	entityOutput: HouseholdOutput,
	auth: getDefaultPermissions([UserRole.User]),
});

@ApiBearerAuth()
@Controller('/household')
@ModuleGroup(ModuleName.Household)
export class HouseholdController extends BaseController {
	constructor(
		private readonly service: HouseholdService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
