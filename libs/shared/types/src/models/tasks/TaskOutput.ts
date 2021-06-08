import { TaskInput } from './TaskInput';

export class TaskOutput extends TaskInput {
	id: number;
	userId: number;
	dateCreated: string;
	dateCompleted: string;
}
