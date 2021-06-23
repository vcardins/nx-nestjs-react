import { TaskTemplateInput, TaskTemplateOutput } from '@xapp/shared/types';
import { DataContext } from '@xapp/state/shared';

export class TaskTemplateStore extends DataContext<TaskTemplateOutput, TaskTemplateInput> {
	constructor(authHeader?: string) {
		super({ basePath: 'task-template', authHeader });
	}
}
