import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { baseAuthControllerFactory, ResourceGroup, getDefaultPermissions } from '@xapp/api/core';
import { SocketService } from '@xapp/api/socket';
import { Resources, RoomTypeOutput, AuthGroups, RoomTypeInput } from '@xapp/shared/types';

import { RoomType } from './entities/room_type.entity';
import { RoomTypeService } from './room_type.service';

const BaseController = baseAuthControllerFactory<RoomType>({
	entity: RoomType,
	entityOutput: RoomTypeOutput,
	entityCreateInput: RoomTypeInput,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@ApiBearerAuth()
@Controller('/room_type')
@ResourceGroup(Resources.RoomType)
export class RoomTypeController extends BaseController {
	constructor(
		private readonly service: RoomTypeService,
		private readonly socketService: SocketService,
	) {
		super(service, socketService);
	}
}
