import { Controller, Response, InternalServerErrorException, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { Entity } from 'typeorm';

import { ApiException } from '@xapp/api/core';
import { getOperationId } from '@xapp/shared/utils';

import { LookupService } from './lookup.service';
import { LookupOutput } from './lookup.output';

@ApiBearerAuth()
@Controller('/lookup')
export class LookupController {
	constructor(
		private readonly service: LookupService,
	) {}

	@Get('')
	@ApiBody({
		type: LookupOutput,
		description: 'Data for entity update',
		required: true,
		isArray: false,
	})
	@ApiOkResponse({ type: LookupOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Complete Lookup'))
	public async getAll(@Response() response) {
		try {
			const data = await this.service.getAll();

			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
