import { GetState, SetState, StateCreator, UseStore } from 'zustand';

import { ApiCallStatus, createStore, setError, setLoading, createBaseStore, ICrudState } from '@xapp/state/shared';
import { HouseholdInput, HouseholdInvitationInput, HouseholdInvitationWelcome, HouseholdOutput, HouseholdMemberSignup, HouseholdRoomInput } from '@xapp/shared/types';

import { HouseholdStore } from './HouseholdStore';

export interface IHouseholdState extends ICrudState<HouseholdStore, HouseholdOutput> {
	invitation?: HouseholdInvitationWelcome;
	invite?: (model: HouseholdInvitationInput) => Promise<void>;
	getInvitation?: (invitationCode: string) => Promise<void>;
	registerMember?: (data: HouseholdMemberSignup) => Promise<void>;
	addRoom?: (data: HouseholdRoomInput) => Promise<void>;
	removeRoom?: (householdId: number, householdRoomId: number) => Promise<void>;
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
			registerMember: async (data: HouseholdMemberSignup) => {
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

			addRoom: async (data: HouseholdRoomInput) => {
				const { items, store, status } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					const response = await store.addRoom(data);

					const householdIndex = items.findIndex(({ id }) => id === data.householdId);
					const updatedRooms = items[householdIndex].rooms.concat([response]);

					set((state) => void (
						(state.items[householdIndex].rooms = updatedRooms),
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					));
				}
				catch (error) {
					setError(set)(error);
				}
			},

			removeRoom: async (householdId: number, householdRoomId: number)  => {
				const { items, store, status } = get();

				if (status === ApiCallStatus.Loading) {
					return;
				}

				setLoading(set)();

				try {
					await store.removeRoom(householdRoomId);
					const householdIndex = items.findIndex(({ id }) => id === householdId);
					const updatedRooms = items[householdIndex].rooms.filter(({ id }) => id !== householdRoomId);

					set((state) => void (
						(state.items[householdIndex].rooms = updatedRooms),
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
