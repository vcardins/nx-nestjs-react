import { TodoInput } from './TodoInput';

export class TodoOutput extends TodoInput {
	id: number;
	userId: number;
	dateCreated: string;
	dateCompleted: string;
}
