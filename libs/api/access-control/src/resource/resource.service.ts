import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService } from '@xapp/api/core';

import { Resource } from './resource.entity';

@Injectable()
export class ResourceService extends BaseService<Resource> {
	items: Resource[] = [];

	static modelName = 'resources';

	constructor(
		@InjectRepository(Resource) protected readonly repository: Repository<Resource>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}


	async preloadAll() {
		if (!this.items) {
			const qb = this.createQueryBuilder();
			const resources = await qb
				.leftJoinAndSelect(`${this.modelName}.permissions`, 'permission')
				.getMany();


			this.items = plainToClass(Resource, resources);

			// Logger.log(JSON.stringify(resources.map((group) => group.name)), ResourceService.name);

			return this.items;
		}
	}
}
