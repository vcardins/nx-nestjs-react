import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@xapp/api/database';

import { PublicFile } from './public-file.entity';
import { FilesService } from './files.service';

@Module({
	imports: [
		DatabaseModule.forFeature([PublicFile]),
		ConfigModule,
	],
	providers: [FilesService],
	exports: [FilesService],
})
export class FilesModule {}
