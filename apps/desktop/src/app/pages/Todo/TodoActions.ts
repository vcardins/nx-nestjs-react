import { ActionMap } from '../../actions/ActionMap';
import { TodoOutput } from './TodoOutput';

export enum TodoActionTypes {
	Add = 'ADD_TODO_ITEM',
	Update = 'UPDATE_TODO_ITEM',
	Read = 'LOAD_TODO_ITEMS',
	Delete = 'DELETE_TODO_ITEM',
	Complete = 'COMPLETE_TODO_ITEM',
}

export type TodoInput = {
	todoItem: TodoOutput;
};

export type ReadType = TodoOutput[];

export type TodoTypes = {
	Read: TodoOutput[];
	Add: TodoInput;
	Update: TodoInput;
	Delete: TodoInput;
	Completed: TodoInput;
};

export type TodoPayload = {
	[TodoActionTypes.Read]: TodoOutput[];
	[TodoActionTypes.Add]: TodoInput,
	[TodoActionTypes.Update]: TodoInput;
	[TodoActionTypes.Delete]: TodoInput;
	[TodoActionTypes.Complete]: TodoInput;
};

export type TodoActions = ActionMap<TodoPayload>[
	keyof ActionMap<TodoPayload>
];
