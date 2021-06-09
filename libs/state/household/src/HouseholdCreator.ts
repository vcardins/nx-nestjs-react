import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { ApiCallStatus, createStore, setError, setLoading, createBaseStore, ICrudState } from '@xapp/state/shared';
import { HouseholdInput, HouseholdMemberInput, HouseholdOutput } from '@xapp/shared/types';

import { HouseholdStore } from './HouseholdStore';

export interface IHouseholdState extends ICrudState<HouseholdStore, HouseholdOutput> {
	addMember?(model: HouseholdMemberInput): Promise<void>;
}

export const createHousehold: StateCreator<IHouseholdState> = createBaseStore<IHouseholdState, HouseholdInput, HouseholdOutput>(
	HouseholdStore,
	null,
	(set: SetState<IHouseholdState>, get: GetState<IHouseholdState>) => ({
		addMember: async (model: HouseholdMemberInput) => {
			const { store, status, items } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				const response = await store.addMember(model);
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
	}),
);

export const useHouseholdState: UseStore<ReturnType<typeof createHousehold>> =
	createStore<IHouseholdState>((set, get, api) => createHousehold(set, get, api));
