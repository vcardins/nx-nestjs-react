import { Body, Controller, Response, InternalServerErrorException, Req, Post, BadRequestException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { User, UserService } from '@xapp/api/access-control';

import {
	SocketGateway,
	baseAuthControllerFactory,
	ResourceGroup,
	getDefaultPermissions,
	// Permissions,
	ApiException,
	Roles,
} from '@xapp/api/core';
import {
	Resources,
	HouseholdRoomOutput,
	UserRoles,
	HouseholdRoomInput,
} from '@xapp/shared/types';
import { getOperationId } from '@xapp/shared/utils';
import { plainToClass } from 'class-transformer';
import { Entity } from 'typeorm';

import { HouseholdRoom } from './entities/household_room.entity';
import { HouseholdRoomService } from './household_room.service';

const auth = getDefaultPermissions([UserRoles.Admin]);

const BaseController = baseAuthControllerFactory<HouseholdRoom>({
	entity: HouseholdRoom,
	entityOutput: HouseholdRoomOutput,
	entityCreateInput: HouseholdRoomInput,
	auth,
});

@ApiBearerAuth()
@Controller('/household/room')
@ResourceGroup(Resources.HouseholdRoom)
export class HouseholdRoomController extends BaseController {
	constructor(
		private readonly service: HouseholdRoomService,
		private readonly userService: UserService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}

	@Post()
	@Roles(...auth?.create?.roles)
	// @Permissions(...auth?.create?.permissions)
	@ApiBody({
		type: HouseholdRoomInput,
		description: 'Data for entity creation',
		required: true,
		isArray: false,
	})
	@ApiCreatedResponse({ type: HouseholdRoomOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Create'))
	public async create(@Req() req: { user: User }, @Body() body: HouseholdRoomInput, @Response() response) {
		try {
			const found = await this.service.findByHousehold(body.householdId, body.roomTypeId);

			if (found) {
				throw new BadRequestException('A household with this name already exists');
			}

			// const userId = req.user.id;
			// const user = await this.userService.findById(userId);

			const newHouseholdRoom = plainToClass(HouseholdRoom, body);
			const householdRoom = await this.service.create(newHouseholdRoom);

			response.send(householdRoom);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
