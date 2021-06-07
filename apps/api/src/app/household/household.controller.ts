import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup } from '@xapp/api/core';
import { ModuleAction, ModuleName, HouseholdOutput } from '@xapp/shared/types';
import { Household } from './entities/household.entity';
import { HouseholdService } from './household.service';

const roles = ['user'];

const BaseController = baseAuthControllerFactory<Household>({
	entity: Household,
	entityOutput: HouseholdOutput,
	auth: {
		count: { roles, permissions: [ModuleAction.Read] },
		get: { roles, permissions: [ModuleAction.Read] },
		getById: { roles, permissions: [ModuleAction.Read] },
		create: { roles, permissions: [ModuleAction.Create] },
		update: { roles, permissions: [ModuleAction.Update] },
		updateOrCreate: { roles, permissions: [ModuleAction.Create] },
		delete: { roles, permissions: [ModuleAction.Delete] },
	},
});

@ApiBearerAuth()
@Controller('/household')
@ModuleGroup(ModuleName.Household)
export class HouseholdController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: HouseholdService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
