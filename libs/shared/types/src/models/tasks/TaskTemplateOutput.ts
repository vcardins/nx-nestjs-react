import { TaskTemplateInput } from './TaskTemplateInput';

export class TaskTemplateOutput extends TaskTemplateInput {
	id: number;
	roomTypeId: number;
	frequencyId: number;
}

export type TaskTemplateOutputMapped = Record<number, TaskTemplateOutput[]>;
