import { Controller, Get } from '@nestjs/common';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

import { Public } from '@xapp/api/core';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getData(): { message: string } {
		return this.appService.getData();
	}

	@Public()
	@Get('/schemas')
	getSchemas() {
		const schemas = validationMetadatasToSchemas();
		return { schemas };
	}
}
