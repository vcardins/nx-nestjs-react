import { Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { SocketGateway, baseAuthControllerFactory, ResourceGroup, getDefaultPermissions } from '@xapp/api/core';
import { Resources, RoomTypeOutput, UserRoles, RoomTypeInput } from '@xapp/shared/types';

import { RoomType } from './entities/room_type.entity';
import { RoomTypeService } from './room_type.service';

const BaseController = baseAuthControllerFactory<RoomType>({
	entity: RoomType,
	entityOutput: RoomTypeOutput,
	entityCreateInput: RoomTypeInput,
	auth: getDefaultPermissions([UserRoles.Admin]),
});

@ApiBearerAuth()
@Controller('/room_type')
@ResourceGroup(Resources.RoomType)
export class RoomTypeController extends BaseController {
	constructor(
		private readonly service: RoomTypeService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}
