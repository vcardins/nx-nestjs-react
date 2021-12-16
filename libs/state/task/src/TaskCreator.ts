import { GetState, SetState, StateCreator, UseBoundStore } from 'zustand';

import { createStore, createBaseStore, ICrudState, updateAfterAction } from '@xapp/state/shared';
import { Operations, TaskInput, TaskOutput } from '@xapp/shared/types';

import { TaskStore } from './TaskStore';

type ITaskState = ICrudState<TaskStore, TaskOutput>;

export const createTask: StateCreator<ITaskState> =
	createBaseStore<ITaskState, TaskInput, TaskOutput>(
		TaskStore,
		{ store: new TaskStore() },
		(set: SetState<ITaskState>, get: GetState<ITaskState>) => ({
			getEventsListeners: () => {
				const action = updateAfterAction(set, get);
				return {
					'task:create': (item: any) => action(Operations.Create, item),
					'task:update': (item: any) => action(Operations.Update, item),
					'task:delete': (item: any) => action(Operations.Delete, item),
				};
			},
		})
	);

export const useTaskState: UseBoundStore<ReturnType<typeof createTask>> =
	createStore<ITaskState>((set, get, api) => createTask(set, get, api));
