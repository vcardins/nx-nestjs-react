import { Module } from '@nestjs/common';
import { DatabaseModule } from '@xapp/api/database';

import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

import { HouseholdService } from '../household/household.service';
import { Frequency } from '../shared/entities/frequency.entity';
import { RoomType } from '../shared/entities/room_type.entity';
import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';
import { TaskTemplateService } from '../tasks/task_template.service';
import { TaskTemplate } from '../tasks/entities/task_template.entity';
import { Household } from '../household/entities/household.entity';
import { User, UserService } from '@xapp/api/access-control';
import { MailService, TemplateService } from '@xapp/api/mail';
import { FilesService, PublicFile } from '@xapp/api/files';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Frequency,
			RoomType,
			TaskTemplate,
			Household,
			User,
			PublicFile,
		]),
	],
	controllers: [
		LookupController,
	],
	providers: [
		HouseholdService,
		LookupService,
		FrequencyService,
		RoomTypeService,
		UserService,
		MailService,
		FilesService,
		TemplateService,
		TaskTemplateService,
	],
})
export class LookupModule {}
