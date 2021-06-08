import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { MailModule, MailService, TemplateService } from '@xapp/api/mail';
import { User, UserModule, UserService } from '@xapp/api/users';
import { FilesModule, FilesService, PublicFile } from '@xapp/api/files';

import { Household } from './entities/household.entity';
import { HouseholdMembers } from './entities/household_members.entity';
import { HouseholdRoom } from './entities/household_room.entity';
import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { HouseholdController } from './household.controller';
import { HouseholdService } from './household.service';

@Module({
	imports: [
		MailModule,
		UserModule,
		FilesModule,
		DatabaseModule.forFeature([
			HouseholdRoom,
			Household,
			HouseholdMemberInvitation,
			HouseholdMembers,
			User,
			PublicFile,
		]),
	],
	providers: [
		HouseholdService,
		UserService,
		FilesService,
		MailService,
		TemplateService,
	],
	exports: [
		HouseholdService,
	],
	controllers: [
		HouseholdController,
	],
})
export class HouseholdModule {}
