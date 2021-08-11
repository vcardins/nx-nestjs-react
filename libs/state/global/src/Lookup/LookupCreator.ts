import { StateCreator, UseStore } from 'zustand';

import { SortDirections, ILookup } from '@xapp/shared/types';
import { IAuthState, ApiCallStatus, createStore, setError, setLoading, setSuccess } from '@xapp/state/shared';

import { LookupStore } from './LookupStore';
import { ILookupState } from './ILookupState';

const data = {} as ILookup;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createLookup: StateCreator<ILookupState> = (set, get, api) => ({
	store: null,
	status: ApiCallStatus.Idle,
	error: null,
	...data,
	sortBy: { id: SortDirections.ASC },
	init(props: IAuthState): Promise<void> {
		return new Promise((resolve) => {
			const store = new LookupStore(props.authHeader);
			set({ store });
			resolve();
		});
	},
	async read() {
		const { status, store } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		setLoading(set)();

		try {
			const data = await store.read();

			setSuccess(set)({ ...data, isApiReady: true });
		}
		catch (error) {
			setError(set)(error);
		}
	},
	clearError() {
		set({ error: null });
	},
});

export const useLookupState: UseStore<ReturnType<typeof createLookup>> =
	createStore<ILookupState>((set, get, api) => createLookup(set, get, api));
