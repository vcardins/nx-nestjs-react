import { Body, Controller, Response, InternalServerErrorException, Req, Post, Get, Param, BadRequestException, Delete, Patch } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { User, UserService } from '@xapp/api/access-control';

import {
	baseAuthControllerFactory,
	ResourceGroup,
	getDefaultPermissions,
	Permissions,
	ApiException,
	Public,
	Roles,
} from '@xapp/api/core';
import { SocketGateway } from '@xapp/api/socket';
import {
	Resources,
	HouseholdOutput,
	AuthGroups,
	HouseholdInvitationInput,
	HouseholdInvitationOutput,
	HouseholdInvitationAcceptance,
	HouseholdMemberSignup,
	HouseholdInput,
	HouseholdType,
	HouseholdRoomInput,
	HouseholdRoomOutput,
	IdType,
	Operations,
} from '@xapp/shared/types';
import { getOperationId } from '@xapp/shared/utils';
import { plainToClass } from 'class-transformer';
import { Entity } from 'typeorm';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { HouseholdRoom } from './entities/household_room.entity';
import { HouseholdService } from './household.service';
import { HouseholdMemberService } from './household_member.service';
import { HouseholdRoomService } from './household_room.service';

const auth = getDefaultPermissions(AuthGroups.User);

const BaseController = baseAuthControllerFactory<Household>({
	entity: Household,
	entityOutput: HouseholdOutput,
	entityCreateInput: HouseholdInput,
	auth,
});

const event = (action: Operations) => `${Resources.Household}:${action}`;

@Controller('/household')
@ResourceGroup(Resources.Household)
export class HouseholdController extends BaseController {
	constructor(
		private readonly service: HouseholdService,
		private readonly userService: UserService,
		private readonly householdMemberService: HouseholdMemberService,
		private readonly householdRoomService: HouseholdRoomService,
		private readonly socket: SocketGateway
	) {
		super(service);

		this.service.afterCreate = (data: any) => socket.emit(event(Operations.Create), data);
		this.service.afterUpdate = (data: any) => socket.emit(event(Operations.Update), data);
		this.service.afterDelete = (data: any) => socket.emit(event(Operations.Delete), data);
	}

	@Get()
	@Roles(auth?.get?.roles)
	@Permissions(...auth?.get?.permissions)
	@ApiOkResponse({
		type: HouseholdOutput,
		isArray: true,
	})
	@ApiBadRequestResponse({ type: ApiException })
	public async get(@Req() req: any, @Response() response?) {
		try {
			const userId = req.user?.id ? Number(req.user?.id) : null;

			if (userId) {
				const result = await this.service.getUserHouseholds(userId);
				return response.send(result);
			}
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Post()
	@Roles(auth?.create?.roles)
	// @Permissions(...auth?.create?.permissions)
	@ApiBody({
		type: HouseholdInput,
		description: 'Data for entity creation',
		required: true,
		isArray: false,
	})
	@ApiCreatedResponse({ type: HouseholdOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Create'))
	public async create(@Req() req: { user: User }, @Body() body: HouseholdInput, @Response() response) {
		try {
			const found = await this.service.findByName(body.name);

			if (found) {
				throw new BadRequestException('A household with this name already exists');
			}

			const userId = req.user.id;
			const user = await this.userService.findById(userId);

			const newHousehold = plainToClass(Household, { ...body, ownerUser: user });
			const household = await this.service.create(newHousehold);

			const member = plainToClass(HouseholdMember, {
				type: HouseholdType.Head,
				isDefault: true,
				user,
				household,
			});
			await this.householdMemberService.create(member);

			response.send(household);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Post('invite')
	// @Permissions(...auth?.update?.permissions)
	@ApiBody({
		type: HouseholdInvitationInput,
		required: true,
		isArray: false,
	})
	@ApiOkResponse({ type: HouseholdInvitationOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Send Invitation'))
	public async invite(@Req() req, @Body() model: HouseholdInvitationInput, @Response() response) {
		try {
			const payload = { ...model, inviterId: Number(req.user?.id) };

			const data = await this.householdMemberService.sendInvitation(payload);
			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Post('invitation/accept')
	// @Permissions(...auth?.update?.permissions)
	@ApiBody({
		type: HouseholdInvitationInput,
		required: true,
		isArray: false,
	})
	@ApiOkResponse({ type: HouseholdInvitationOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Send Invitation'))
	public async acceptInvitation(@Req() req, @Body() model: HouseholdInvitationAcceptance, @Response() response) {
		try {
			const userId = req.user?.id ? Number(req.user?.id) : null;
			const payload = { ...model, inviterId: userId };

			const data = await this.householdMemberService.acceptInvitation(payload);
			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Public()
	@Get('invitation/:code')
	// @Permissions(...auth?.update?.permissions)
	@ApiBody({
		required: true,
		isArray: false,
	})
	// @ApiOkResponse({ type: HouseholdInvitationOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Request Invitation info'))
	public async getInvitation(@Param('code') code: string, @Req() req, @Response() response) {
		try {
			const data = await this.householdMemberService.findInvitationByCode(code);
			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Public()
	@Post('signup')
	// @Permissions(...auth?.update?.permissions)
	@ApiBody({
		required: true,
		isArray: false,
	})
	// @ApiOkResponse({ type: ISignedUserOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Request Invitation info'))
	public async signUp(@Body() model: HouseholdMemberSignup, @Response() response) {
		try {
			const data = await this.householdMemberService.addMemberByInvitation(model);
			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	/*  ROOM */

	@Post('room')
	@Roles(auth?.create?.roles)
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
	public async addRoom(@Req() req: { user: User }, @Body() body: HouseholdRoomInput, @Response() response) {
		try {
			const newHouseholdRoom = plainToClass(HouseholdRoom, body);
			const householdRoom = await this.householdRoomService.create(newHouseholdRoom);

			response.send(householdRoom);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Delete('room/:id')
	@Roles(auth?.create?.roles)
	// @Permissions(...auth?.create?.permissions)
	@ApiBody({
		type: HouseholdRoomInput,
		description: 'Data for entity creation',
		required: true,
		isArray: false,
	})
	@ApiCreatedResponse({ type: HouseholdRoomOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Delete'))
	public async removeRoom(@Param('id') id: IdType, @Response() response) {
		try {
			const data = await this.householdRoomService.delete(id);

			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}

	@Patch('room/:id')
	@Roles(auth?.create?.roles)
	// @Permissions(...auth?.create?.permissions)
	@ApiBody({
		type: HouseholdRoomInput,
		description: 'Data for entity creation',
		required: true,
		isArray: false,
	})
	@ApiCreatedResponse({ type: HouseholdRoomOutput })
	@ApiBadRequestResponse({ type: ApiException })
	@ApiOperation(getOperationId(Entity.name, 'Delete'))
	public async updateRoom(@Param('id') id: IdType, @Body() body: HouseholdRoomInput, @Response() response) {
		try {
			const data = await this.householdRoomService.update(id, body);

			response.send(data);
		}
		catch (e) {
			throw new InternalServerErrorException(e);
		}
	}
}
