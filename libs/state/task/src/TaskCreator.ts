import { StateCreator, UseBoundStore } from 'zustand';

import { createStore, createBaseStore, ICrudState } from '@xapp/state/shared';
import { TaskInput, TaskOutput } from '@xapp/shared/types';

import { TaskStore } from './TaskStore';

// export interface ITaskState extends ICrudState<TaskStore, TaskOutput> {}
type ITaskState = ICrudState<TaskStore, TaskOutput>;

export const createTask: StateCreator<ITaskState> =
	createBaseStore<ITaskState, TaskInput, TaskOutput>(
		TaskStore,
		{ store: new TaskStore() },
	);

export const useTaskState: UseBoundStore<ReturnType<typeof createTask>> =
	createStore<ITaskState>((set, get, api) => createTask(set, get, api));
