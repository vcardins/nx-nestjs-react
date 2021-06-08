import { Module } from '@nestjs/common';
import { DatabaseModule } from '@xapp/api/database';

import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';

import { Frequency } from '../shared/entities/frequency.entity';
import { RoomType } from '../shared/entities/room_type.entity';
import { FrequencyService } from '../shared/frequency.service';
import { RoomTypeService } from '../shared/room_type.service';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Frequency,
			RoomType,
		]),
	],
	controllers: [
		LookupController,
	],
	providers: [
		LookupService,
		FrequencyService,
		RoomTypeService,
	],
})
export class LookupModule {}
