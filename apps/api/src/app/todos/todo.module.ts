import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { SocketService } from '@xapp/api/socket';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Module({
	imports: [
		DatabaseModule.forFeature([Todo]),
	],
	controllers: [TodoController],
	providers: [TodoService, SocketService],
})
export class TodoModule {}
