import { TodoActionTypes, TodoActions, TodoInput, ReadType } from './TodoActions';
import { TodoOutput } from './TodoOutput';

export const todoReducer = (state: TodoOutput[], { type, payload }: TodoActions) => {
	let todoItem: TodoOutput;

	switch (type) {
		case TodoActionTypes.Add:
			todoItem = (payload as TodoInput).todoItem;
			return [todoItem, ...state];
		case TodoActionTypes.Complete:
			todoItem = (payload as TodoInput).todoItem;
			// eslint-disable-next-line no-case-declarations
			const todoItemIndex = state.findIndex(({ id }) => todoItem.id === id);
			// eslint-disable-next-line no-case-declarations
			const foundTodo = state[state.findIndex(({ id }) => todoItem.id === id)];

			return [...state.slice(0, todoItemIndex), { ...foundTodo, ...todoItem }, ...state.slice(todoItemIndex + 1)];
		case TodoActionTypes.Delete:
			todoItem = (payload as TodoInput).todoItem;
			return state.filter(({ id }) => todoItem.id !== id);
		case TodoActionTypes.Read:
			return [...state, ...payload as ReadType];
		default:
			return state;
	}
};
