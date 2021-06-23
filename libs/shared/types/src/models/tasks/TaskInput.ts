import { TaskTemplateOutput } from './TaskTemplateOutput';

export class TaskInput {
	name: string;
	dueDate: Date | null;
	notes?: string | null;

	templateId: TaskTemplateOutput['id'] | null;
}
