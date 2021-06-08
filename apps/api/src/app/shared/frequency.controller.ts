import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ModuleGroup, getDefaultPermissions } from '@xapp/api/core';
import { ModuleName, FrequencyOutput, UserGroup, FrequencyInput } from '@xapp/shared/types';

import { Frequency } from './entities/frequency.entity';
import { FrequencyService } from './frequency.service';

const BaseController = baseAuthControllerFactory<Frequency>({
	entity: Frequency,
	entityOutput: FrequencyOutput,
	entityCreateInput: FrequencyInput,
	auth: getDefaultPermissions([UserGroup.Admin]),
});

@ApiBearerAuth()
@Controller('/frequency')
@ModuleGroup(ModuleName.Frequency)
export class FrequencyController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: FrequencyService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
