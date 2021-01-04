import { TodoOutput } from './dto/todo.output';

export interface ITodoComplete {
	id: TodoOutput['id'];
	setIncomplete?: boolean;
}
