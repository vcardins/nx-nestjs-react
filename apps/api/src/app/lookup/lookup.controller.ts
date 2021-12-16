import { Controller, Req, Response, InternalServerErrorException, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';
import { Entity } from 'typeorm';

import { ApiException, TransformInterceptor } from '@xapp/api/core';
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
	@UseInterceptors(new TransformInterceptor(LookupOutput))
	@ApiOperation(getOperationId(Entity.name, 'Complete Lookup'))
	public async getAll(@Req() req, @Response() response) {
		try {
			const data = await this.service.getAll(Number(req.user?.id));
			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
