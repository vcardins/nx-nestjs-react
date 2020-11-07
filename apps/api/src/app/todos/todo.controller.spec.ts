import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
	let todo: TestingModule;

	beforeAll(async () => {
		todo = await Test.createTestingModule({
			controllers: [TodoController],
			providers: [TodoService],
		}).compile();
	});

	describe('getData', () => {
		it('should return "Welcome to api!"', () => {
			const todoController = todo.get<TodoController>(TodoController);
			expect(todoController.get()).toEqual({ message: 'Welcome to api!' });
		});
	});
});
