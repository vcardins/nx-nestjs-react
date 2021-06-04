import { TodoOutput } from './TodoOutput';
import { TodoInput } from './TodoInput';
import { DataContext } from '@xapp/state/shared';

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
