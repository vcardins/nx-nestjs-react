import { GetState, SetState, StateCreator, UseBoundStore } from 'zustand';

import {
	createStore,
	createBaseStore,
	updateAfterAction,
	storeValues,
	ICrudState,
	ApiCallStatus,
	setError,
	setLoading,
} from '@xapp/state/shared';
import {
	TaskTemplateInput,
	TaskTemplateOutput,
	TaskTemplateOutputMapped,
	KeyType,
	Positioning,
	DataFormats,
	IColumnInfo,
	Resources,
	Operations,
} from '@xapp/shared/types';

import { TaskTemplateStore } from './TaskTemplateStore';

const columns: IColumnInfo[] = [
	{ key: 'roomTypeId', label: 'Room Type', width: 80, fixed: Positioning.Left },
	{ key: 'name', label: 'Name', width: 250 },
	{ key: 'description', label: 'Description' },
	{
		key: 'estimatedCompletionTime',
		label: 'ECT',
		width: 35,
		align: Positioning.Center,
		fixed: Positioning.Right,
		format: DataFormats.Integer,
	},
	{ key: 'rewardPoints', label: 'Reward Points', width: 80, align: Positioning.Center, format: DataFormats.Integer },
	{ key: 'frequencyId', label: 'Frequency', width: 80 },
	{ key: 'daysOfWeek', label: 'Days', width: 35, align: Positioning.Center },
	{
		key: 'isActive',
		label: 'Active',
		width: 40,
		align: Positioning.Center,
		fixed: Positioning.Right,
		format: DataFormats.Boolean,
	},
];

export interface ITaskTemplateState extends ICrudState<TaskTemplateStore, TaskTemplateOutput, TaskTemplateInput> {
	mappedItems?: TaskTemplateOutputMapped;
	read: (filters?: Record<string, unknown>) => Promise<void>;
}

export const createTaskTemplate: StateCreator<ITaskTemplateState> = createBaseStore<
	ITaskTemplateState,
	TaskTemplateInput,
	TaskTemplateOutput
>(
	TaskTemplateStore,
	{
		store: new TaskTemplateStore(),
		mappedItems: {} as TaskTemplateOutputMapped,
		columns,
	},
	(set: SetState<ITaskTemplateState>, get: GetState<ITaskTemplateState>) => ({
		getEventsListeners: () => {
			const action = updateAfterAction(set, get);
			return {
				'task-template:create': (item: any) => action(Operations.Create, item),
				'task-template:update': (item: any) => action(Operations.Update, item),
				'task-template:delete': (item: any) => action(Operations.Delete, item),
			};
		},
		read: async (): Promise<void> => {
			const { store, status } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				const response = await store.read<unknown, TaskTemplateOutputMapped>();
				const items = Object.values(response).flatMap((item) => item);

				set(
					(state) =>
						void ((state.mappedItems = response),
						(state.items = items),
						(state.status = ApiCallStatus.Success),
						(state.error = null))
				);
			} catch (error) {
				setError(set)(error.message);
			}
		},
		setExpandedItems(id: KeyType | KeyType[]) {
			const { expandedItems } = get();
			const values = storeValues(id, expandedItems);

			set({ expandedItems: values });
		},
	})
);

export const useTaskTemplateState: UseBoundStore<ReturnType<typeof createTaskTemplate>> =
	createStore<ITaskTemplateState>((set, get, api) => createTaskTemplate(set, get, api));
