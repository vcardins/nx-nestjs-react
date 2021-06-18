import { Module } from '@nestjs/common';
import { DatabaseModule } from '@xapp/api/database';

import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

import { Frequency } from '../shared/entities/frequency.entity';
import { RoomType } from '../shared/entities/room_type.entity';
import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';
import { TaskTemplateService } from '../tasks/task_template.service';
import { TaskTemplate } from '../tasks/entities/task_template.entity';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Frequency,
			RoomType,
			TaskTemplate,
		]),
	],
	controllers: [
		LookupController,
	],
	providers: [
		LookupService,
		FrequencyService,
		RoomTypeService,
		TaskTemplateService,
	],
})
export class LookupModule {}
