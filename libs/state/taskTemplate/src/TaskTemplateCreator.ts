import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { createStore, createBaseStore, storeValues, ICrudState, ApiCallStatus, setError, setLoading } from '@xapp/state/shared';
import { TaskTemplateInput, TaskTemplateOutput, TaskTemplateOutputMapped, KeyType } from '@xapp/shared/types';

import { TaskTemplateStore } from './TaskTemplateStore';

export interface ITaskTemplateState extends ICrudState<TaskTemplateStore, TaskTemplateOutput> {
	mappedItems?: TaskTemplateOutputMapped;
	expandedItems?: KeyType[];
	setExpandedItems?: (items: KeyType | KeyType[]) => void;
	read: (filters?: Record<string, unknown>) => Promise<void>;
};

export const createTaskTemplate: StateCreator<ITaskTemplateState> =
	createBaseStore<ITaskTemplateState, TaskTemplateInput, TaskTemplateOutput>(
		TaskTemplateStore,
		{
			store: new TaskTemplateStore(),
			mappedItems: {} as TaskTemplateOutputMapped,
			expandedItems: [],
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
					const items = Object.values(response).flatMap((item) => item);

					set((state) => void (
						(state.mappedItems = response),
						(state.items = items),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error.message);
				}
			},

			setExpandedItems(id: KeyType | KeyType[]) {
				const { expandedItems } = get();
				const values = storeValues(id, expandedItems);

				set({ expandedItems: values });
			},
		}),
	);

export const useTaskTemplateState: UseStore<ReturnType<typeof createTaskTemplate>> =
	createStore<ITaskTemplateState>((set, get, api) => createTaskTemplate(set, get, api));
