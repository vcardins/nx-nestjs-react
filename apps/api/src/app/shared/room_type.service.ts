import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper } from 'nestjsx-automapper';

import { BaseService } from '@xapp/api/core';
import { RoomType } from './entities/room_type.entity';

@Injectable()
export class RoomTypeService extends BaseService<RoomType> {
	items: RoomType[] = [];

	static modelName = 'roomTypes';

	constructor(
		@InjectRepository(RoomType) protected readonly repository: Repository<RoomType>,
		@InjectMapper() autoMapper,
	) {
		super(repository, autoMapper);
	}
}
