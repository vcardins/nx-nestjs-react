import { DynamicModule, Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { MailModule, MailService, TemplateService } from '@xapp/api/mail';
import { User, UserModule, UserService } from '@xapp/api/access-control';
import { FilesModule, FilesService, PublicFile } from '@xapp/api/files';

import { Household } from './entities/household.entity';
import { HouseholdMember } from './entities/household_member.entity';
import { HouseholdRoom } from './entities/household_room.entity';
import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';
import { HouseholdMemberService } from './household_member.service';
// import { AuthService } from '@xapp/api/auth';
import { CoreModule } from '@xapp/api/core';

@Module({})
export class HouseholdModule {
	static forFeature( authModule: DynamicModule ): DynamicModule {
		return {
			module: HouseholdModule,
			imports: [
				MailModule,
				UserModule,
				FilesModule,
				CoreModule,
				authModule,
				DatabaseModule.forFeature([
					HouseholdRoom,
					Household,
					HouseholdMemberInvitation,
					HouseholdMember,
					User,
					PublicFile,
				]),
			],
			providers: [
				HouseholdService,
				HouseholdMemberService,
				UserService,
				// AuthService,
				FilesService,
				MailService,
				TemplateService,
			],
			exports: [
				HouseholdService,
				HouseholdMemberService,
			],
			controllers: [
				HouseholdController,
			],
		};
	}
}
