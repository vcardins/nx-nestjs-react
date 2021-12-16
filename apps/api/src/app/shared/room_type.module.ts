import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { RoomType } from './entities/room_type.entity';
import { RoomTypeController } from './room_type.controller';
import { RoomTypeService } from './room_type.service';

@Module({
	imports: [
		DatabaseModule.forFeature([RoomType]),
	],
	controllers: [RoomTypeController],
	providers: [RoomTypeService],
})
export class RoomTypeModule {}
