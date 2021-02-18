import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { CategoryTask } from './entities/category_task.entity';
import { Category } from './entities/category.entity';
import { Frequency } from './entities/frequency.entity';
import { TaskTemplate } from './entities/task_template.entity';
import { Task } from './entities/task.entity';

import { TaskService } from './task.service';

@Module({
	imports: [
		DatabaseModule.forFeature([
			CategoryTask,
			Category,
			Frequency,
			TaskTemplate,
			Task,
		]),
	],
	providers: [TaskService],
	exports: [TaskService],
})
export class TaskModule {}
