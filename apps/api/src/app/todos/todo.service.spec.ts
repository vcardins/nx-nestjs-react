import { Test } from '@nestjs/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
	let service: TodoService;

	beforeAll(async () => {
		const todo = await Test.createTestingModule({
			providers: [TodoService],
		}).compile();

		service = todo.get<TodoService>(TodoService);
	});

	describe('getAll', () => {
		it('should return "Welcome to api!"', () => {
			expect(service.getAll()).toEqual([{ title: 'Todo 1' }, { title: 'Todo 2' }]);
		});
	});
});
