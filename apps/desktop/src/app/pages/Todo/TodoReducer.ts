import {
	TodoActionTypes,
	TodoActions,
	TodoInput,
	ReadType,
} from './TodoActions';
import { TodoOutput } from './TodoOutput';

export const todoReducer = (
	state: TodoOutput[],
	{type, payload}: TodoActions,
) => {
	let todoItem: TodoOutput;

	switch (type) {
		case TodoActionTypes.Add:
			todoItem = (payload as TodoInput).todoItem;
			return [
				todoItem,
				...state,
			];
		case TodoActionTypes.Complete:
			todoItem = (payload as TodoInput).todoItem;
			const todoItemIndex = state.findIndex(({id}) => todoItem.id === id);
			const foundTodo = state[todoItemIndex];

			return [
				...state.slice(0, todoItemIndex),
				{...foundTodo, ...todoItem},
				...state.slice(todoItemIndex + 1),
			];
		case TodoActionTypes.Delete:
			todoItem = (payload as TodoInput).todoItem;
			return state.filter(({id}) => todoItem.id !== id);
		case TodoActionTypes.Read:
			const items = (payload as ReadType);
			return [
				...state,
				...items,
			];
		default:
			return state;
	}
};
