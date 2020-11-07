import { TodoOutput } from './todo.output';

export interface ITodoComplete {
	id: TodoOutput['id'];
	setIncomplete?: boolean;
}
