import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { ApiCallStatus, createStore, setError, setLoading, createBaseStore, ICrudState } from '@xapp/state/shared';
import { HouseholdInput, HouseholdInvitationInput, HouseholdInvitationWelcome, HouseholdOutput, HouseholdMemberSignup } from '@xapp/shared/types';

import { HouseholdStore } from './HouseholdStore';

export interface IHouseholdState extends ICrudState<HouseholdStore, HouseholdOutput> {
	invitation?: HouseholdInvitationWelcome;
	invite?: (model: HouseholdInvitationInput) => Promise<void>;
	getInvitation?: (invitationCode: string) => Promise<void>;
	signUpMember?: (data: HouseholdMemberSignup) => Promise<void>;
}

export const createHousehold: StateCreator<IHouseholdState> =
	createBaseStore<IHouseholdState, HouseholdInput, HouseholdOutput>(
		HouseholdStore,
		{ store: new HouseholdStore() },
		(set: SetState<IHouseholdState>, get: GetState<IHouseholdState>) => ({
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
			invite: async (model: HouseholdInvitationInput) => {
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
			signUpMember: async (data: HouseholdMemberSignup) => {
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

export const useHouseholdState: UseStore<ReturnType<typeof createHousehold>> =
	createStore<IHouseholdState>((set, get, api) => createHousehold(set, get, api));
