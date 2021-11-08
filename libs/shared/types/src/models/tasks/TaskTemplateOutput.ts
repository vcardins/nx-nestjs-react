import { TaskTemplateInput } from './TaskTemplateInput';

export class TaskTemplateOutput extends TaskTemplateInput {
	id: number;
}

export type TaskTemplateOutputMapped = Record<number, TaskTemplateOutput[]>;
