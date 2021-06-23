import { StateCreator, UseStore } from 'zustand';

import { createStore, createBaseStore, ICrudState } from '@xapp/state/shared';
import { TaskTemplateInput, TaskTemplateOutput } from '@xapp/shared/types';

import { TaskTemplateStore } from './TaskTemplateStore';

export interface ITaskTemplateState extends ICrudState<TaskTemplateStore, TaskTemplateOutput> {}

export const createTaskTemplate: StateCreator<ITaskTemplateState> =
	createBaseStore<ITaskTemplateState, TaskTemplateInput, TaskTemplateOutput>(
		TaskTemplateStore,
		{ store: new TaskTemplateStore() },
		// (set: SetState<ITaskTemplateState>, get: GetState<ITaskTemplateState>) => ({

		// }),
	);

export const useTaskTemplateState: UseStore<ReturnType<typeof createTaskTemplate>> =
	createStore<ITaskTemplateState>((set, get, api) => createTaskTemplate(set, get, api));
