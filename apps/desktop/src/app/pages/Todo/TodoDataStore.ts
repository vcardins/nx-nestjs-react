import { DataContext } from '@xapp/react/core';

import { TodoOutput } from './TodoOutput';
import { TodoInput } from './TodoInput';

export class TodoStore extends DataContext<TodoOutput, TodoInput> {
	constructor(authHeader?: string) {
		super({
			basePath: 'todo',
			authHeader,
		});
	}

	complete = (id: number, setIncomplete = false) =>
		this.patch({ url: 'complete', data: { id, setIncomplete } });
}
