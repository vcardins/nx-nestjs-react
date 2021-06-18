import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { ApiCallStatus, createStore, setError, setLoading, createBaseStore, ICrudState } from '@xapp/state/shared';
import { TaskInput, TaskInvitationInput, TaskInvitationWelcome, TaskOutput, TaskMemberSignup } from '@xapp/shared/types';

import { TaskStore } from './TaskStore';

export interface ITaskState extends ICrudState<TaskStore, TaskOutput> {
	invitation?: TaskInvitationWelcome;
	invite?: (model: TaskInvitationInput) => Promise<void>;
	getInvitation?: (invitationCode: string) => Promise<void>;
	signUpMember?: (data: TaskMemberSignup) => Promise<void>;
}

export const createTask: StateCreator<ITaskState> =
	createBaseStore<ITaskState, TaskInput, TaskOutput>(
		TaskStore,
		{ store: new TaskStore() },
		(set: SetState<ITaskState>, get: GetState<ITaskState>) => ({
			getInvitation: async (invitationCode: string): Promise<void> => {
				const { store, status } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					const response = await store.getInvitation(invitationCode);

					set((state) => void (
						(state.invitation = response),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error.message);
				}
			},
			invite: async (model: TaskInvitationInput) => {
				const { store, status, items } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					const response = await store.invite(model);
					const index = items.findIndex(({ id }) => id === response.id);

					set((state) => void (
						(state.items[index] = response),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error);
				}
			},

			signUpMember: async (data: TaskMemberSignup) => {
				const { store, status } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					const response = await store.signUpMember(data);

					set((state) => void (
						(state.data = response),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error);
				}
			},
		}),
	);

export const useTaskState: UseStore<ReturnType<typeof createTask>> =
	createStore<ITaskState>((set, get, api) => createTask(set, get, api));
