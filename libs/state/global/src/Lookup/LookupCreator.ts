import { StateCreator, UseStore } from 'zustand';

import { IAuthState, ApiCallStatus, createStore, setError, setLoading, setSuccess } from '@xapp/state/shared';

import { LookupStore } from './LookupStore';
import { ILookupState } from './ILookupState';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

		setLoading(set);

		try {
			const { dateFormats } = await store.read();

			setSuccess(set)({ dateFormats });
		}
		catch (error) {
			setError(set)(error);
		}
	},
});

export const useLookupState: UseStore<ReturnType<typeof createLookup>> =
	createStore<ILookupState>((set, get, api) => createLookup(set, get, api));
