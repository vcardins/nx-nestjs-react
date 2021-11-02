import { GetState, SetState, StateCreator, UseBoundStore } from 'zustand';

import { createStore, createBaseStore, ICrudState } from '@xapp/state/shared';
import { TaskInput, TaskOutput } from '@xapp/shared/types';

import { TaskStore } from './TaskStore';

type ITaskState = ICrudState<TaskStore, TaskOutput>;

export const createTask: StateCreator<ITaskState> =
	createBaseStore<ITaskState, TaskInput, TaskOutput>(
		TaskStore,
		{ store: new TaskStore() },
		(set: SetState<ITaskState>, get: GetState<ITaskState>) => ({
			getEventsListeners: (): Record<string, (arg: any) => void> => {
				const options = get();
				return {
					'task:read': (data: any) => console.log('Task Read Event', data),
				};
			},
		})
	);

export const useTaskState: UseBoundStore<ReturnType<typeof createTask>> =
	createStore<ITaskState>((set, get, api) => createTask(set, get, api));
