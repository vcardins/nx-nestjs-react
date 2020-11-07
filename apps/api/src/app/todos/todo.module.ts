import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

const entities = [Todo];

@Module({
	imports: [
		DatabaseModule.forFeature(entities),
	],
	controllers: [TodoController],
	providers: [TodoService],
})
export class TodoModule {}
