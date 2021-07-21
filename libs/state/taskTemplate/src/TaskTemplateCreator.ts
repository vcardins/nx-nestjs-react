import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { createStore, createBaseStore, ICrudState, ApiCallStatus, setError, setLoading } from '@xapp/state/shared';
import { TaskTemplateInput, TaskTemplateOutput, TaskTemplateOutputMapped } from '@xapp/shared/types';

import { TaskTemplateStore } from './TaskTemplateStore';

export interface ITaskTemplateState extends ICrudState<TaskTemplateStore, TaskTemplateOutput> {
	mappedItems?: TaskTemplateOutputMapped;
	read: (filters?: Record<string, unknown>) => Promise<void>;
};

export const createTaskTemplate: StateCreator<ITaskTemplateState> =
	createBaseStore<ITaskTemplateState, TaskTemplateInput, TaskTemplateOutput>(
		TaskTemplateStore,
		{
			store: new TaskTemplateStore(),
			mappedItems: {} as TaskTemplateOutputMapped,
		},
		(set: SetState<ITaskTemplateState>, get: GetState<ITaskTemplateState>) => ({
			read: async (): Promise<void> => {
				const { store, status } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					const response = await store.read<unknown, TaskTemplateOutputMapped>();

					set((state) => void (
						(state.mappedItems = response),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error.message);
				}
			},
		}),
	);

export const useTaskTemplateState: UseStore<ReturnType<typeof createTaskTemplate>> =
	createStore<ITaskTemplateState>((set, get, api) => createTaskTemplate(set, get, api));
