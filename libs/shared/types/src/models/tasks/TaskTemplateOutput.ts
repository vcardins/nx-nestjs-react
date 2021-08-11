import { TaskTemplateInput } from './TaskTemplateInput';

export class TaskTemplateOutput extends TaskTemplateInput {
	id: number;
	roomTypeId: number;
}

export type TaskTemplateOutputMapped = Record<number, TaskTemplateOutput[]>;
