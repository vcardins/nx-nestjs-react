import { DynamicModule, Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { MailModule, MailService, TemplateService } from '@xapp/api/mail';
import { User, UserModule, UserService } from '@xapp/api/access-control';
import { FilesModule, FilesService, PublicFile } from '@xapp/api/files';
import { CoreModule } from '@xapp/api/core';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { HouseholdRoom } from './entities/household_room.entity';
import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';
import { HouseholdMemberService } from './household_member.service';

import { HouseholdRoomService } from './household_room.service';
import { AppGateway } from '../app.gateway';

@Module({})
export class HouseholdModule {
	static forFeature( authModule: DynamicModule ): DynamicModule {
		return {
			module: HouseholdModule,
			imports: [
				authModule,
				CoreModule,
				FilesModule,
				MailModule,
				UserModule,
				DatabaseModule.forFeature([
					Household,
					HouseholdRoom,
					HouseholdMemberInvitation,
					HouseholdMember,
					User,
					PublicFile,
				]),
			],
			providers: [
				HouseholdService,
				HouseholdMemberService,
				HouseholdRoomService,
				UserService,
				FilesService,
				MailService,
				TemplateService,
			],
			exports: [
				HouseholdService,
				HouseholdMemberService,
				HouseholdRoomService,
			],
			controllers: [
				HouseholdController,
			],
		};
	}
}
