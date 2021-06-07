import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { HouseholdCategory } from './entities/household_category.entity';
import { Household } from './entities/household.entity';
import { HouseholdMemberInvitation } from './entities/household_member_invitation.entity';
import { HouseholdMembers } from './entities/household_members.entity';

import { HouseholdService } from './household.service';
import { MailModule, MailService, TemplateService } from '@xapp/api/mail';
import { HouseholdController } from './household.controller';
import { User, UserModule, UserService } from '@xapp/api/users';
import { FilesModule, FilesService, PublicFile } from '@xapp/api/files';

@Module({
	imports: [
		MailModule,
		UserModule,
		FilesModule,
		DatabaseModule.forFeature([
			HouseholdCategory,
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
