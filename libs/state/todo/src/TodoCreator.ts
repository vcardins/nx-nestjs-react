import { StateCreator, UseStore } from 'zustand';

import { IAuthState, ApiCallStatus, createStore } from '@xapp/state/shared';

import { TodoInput } from './TodoInput';
import { TodoOutput } from './TodoOutput';
import { TodoStore } from './TodoStore';
import { ITodoState } from './ITodoState';

export const createTodo: StateCreator<ITodoState> = (set, get, api) => ({
	store: null,
	status: ApiCallStatus.Idle,
	items: [],
	error: null,
	orderBy: { id: 'asc' },
	init(props: IAuthState) {
		set({ store: new TodoStore(props.authHeader) });
	},
	async read(filters?: ITodoState['filters']) {
		const { status, store } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const items = await store.readAll(filters);

			set({
				status: ApiCallStatus.Success,
				items,
				error: null,
			});
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				items: [],
				error,
			});
		}
	},
	async save(data: TodoInput, id?: number) {
		const { store, status, items } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const isNew = !id;
			const item = isNew
				? await store.create({ data })
				: await store.update({ data: { id, ...data } });

			const index = items.findIndex(({ id }) => id === item.id);

			set((state) => void (
				index === -1 ? (state.items = [item, ...items]) : (state.items[index] = item),
				(state.status = ApiCallStatus.Success),
				(state.error = null)
			));
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				error,
			});
		}
	},
	async remove(id: number) {
		const { store, status, items } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			await store.delete(id);

			set({
				status: ApiCallStatus.Success,
				items: items.filter((item) => item.id !== id),
				error: null,
			});
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				error,
			});
		}
	},
	async setComplete(todo: TodoOutput) {
		const { store, status, items } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const response = await store.complete(todo.id, !!todo.dateCompleted);
			const index = items.findIndex(({ id }) => id === response.id);

			set((state) => void (
				(state.items[index] = response),
				(state.status = ApiCallStatus.Success),
				(state.error = null)
			));
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				error,
			});
		}
	},
	reset() {
		set({
			status: ApiCallStatus.Idle,
			items: [],
			error: null,
		});
	},
});

export const useTodoState: UseStore<ReturnType<typeof createTodo>> =
	createStore<ITodoState>((set, get, api) => createTodo(set, get, api))