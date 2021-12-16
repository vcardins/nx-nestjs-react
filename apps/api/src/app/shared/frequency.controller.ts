import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { baseAuthControllerFactory, ResourceGroup, getDefaultPermissions } from '@xapp/api/core';
import { Resources, FrequencyOutput, AuthGroups, FrequencyInput } from '@xapp/shared/types';

import { Frequency } from './entities/frequency.entity';
import { FrequencyService } from './frequency.service';

const BaseController = baseAuthControllerFactory<Frequency>({
	entity: Frequency,
	entityOutput: FrequencyOutput,
	entityCreateInput: FrequencyInput,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@ApiBearerAuth()
@Controller('/frequency')
@ResourceGroup(Resources.Frequency)
export class FrequencyController extends BaseController {
	constructor(readonly service: FrequencyService) {
		super(service);
	}
}
