import { ICrudState } from '@xapp/state/shared';
import { TodoOutput, TodoStore } from '.';

export interface ITodoState extends ICrudState<TodoStore, TodoOutput> {
	setComplete(todo: TodoOutput): Promise<void>;
}
