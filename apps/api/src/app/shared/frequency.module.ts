import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { SocketService } from '@xapp/api/socket';

import { Frequency } from './entities/frequency.entity';
import { FrequencyController } from './frequency.controller';
import { FrequencyService } from './frequency.service';

@Module({
	imports: [
		DatabaseModule.forFeature([Frequency]),
	],
	controllers: [FrequencyController],
	providers: [FrequencyService, SocketService],
})
export class FrequencyModule {}
