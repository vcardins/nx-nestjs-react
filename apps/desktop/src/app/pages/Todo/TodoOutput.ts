import { TodoInput } from './TodoInput';

export class TodoOutput extends TodoInput {
	id: number;
	dateCreated: string;
	dateCompleted: string;
}
