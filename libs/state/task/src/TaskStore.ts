import { TaskInput, TaskOutput } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class TaskStore extends DataContext<TaskOutput, TaskInput> {
	constructor(authHeader?: string) {
		super({ basePath: 'task', authHeader });
	}
}
