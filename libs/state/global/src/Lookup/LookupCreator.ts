import { StateCreator, UseStore } from 'zustand';

import { IAuthState, ApiCallStatus, createStore } from '@xapp/state/shared';

import { LookupStore } from './LookupStore';
import { ILookupState } from './ILookupState';

export const createLookup: StateCreator<ILookupState> = (set, get, api) => ({
	store: null,
	status: ApiCallStatus.Idle,
	dateFormats: [],
	error: null,
	orderBy: { id: 'asc' },
	init(props: IAuthState) {
		set({ store: new LookupStore(props.authHeader) });
	},
	async read() {
		const { status, store } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		set({ status: ApiCallStatus.Loading });

		try {
			const { dateFormats } = await store.read();

			set({
				status: ApiCallStatus.Success,
				dateFormats,
				error: null,
			});
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				error,
			});
		}
	}
});

export const useLookupState: UseStore<ReturnType<typeof createLookup>> =
	createStore<ILookupState>((set, get, api) => createLookup(set, get, api))
