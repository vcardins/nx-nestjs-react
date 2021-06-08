import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { MailModule, MailService, TemplateService } from '@xapp/api/mail';
import { User, UserModule, UserService } from '@xapp/api/users';
import { FilesModule, FilesService, PublicFile } from '@xapp/api/files';

import { FrequencyService } from '../shared/frequency.service';
import { Task } from './entities/task.entity';
import { TaskTemplate } from './entities/task_template.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskTemplateController } from './task_template.controller';
import { TaskTemplateService } from './task_template.service';
import { Frequency } from '../shared/entities/frequency.entity';


@Module({
	imports: [
		MailModule,
		UserModule,
		FilesModule,
		DatabaseModule.forFeature([
			Task,
			TaskTemplate,
			Frequency,
			User,
			PublicFile,
		]),
	],
	providers: [
		TaskService,
		TaskTemplateService,
		UserService,
		FilesService,
		FrequencyService,
		MailService,
		TemplateService,
	],
	exports: [
		TaskService,
		TaskTemplateService,
	],
	controllers: [
		TaskController,
		TaskTemplateController,
	],
})
export class TaskModule {}
