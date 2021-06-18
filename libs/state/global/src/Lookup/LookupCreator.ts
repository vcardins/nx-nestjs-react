import { StateCreator, UseStore } from 'zustand';

import { SortDirections } from '@xapp/shared/types';
import { IAuthState, ApiCallStatus, createStore, setError, setLoading, setSuccess } from '@xapp/state/shared';

import { LookupStore } from './LookupStore';
import { ILookupState } from './ILookupState';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createLookup: StateCreator<ILookupState> = (set, get, api) => ({
	store: null,
	status: ApiCallStatus.Idle,
	dateFormats: null,
	oAuthProviders: null,
	authRoles: null,
	userRoles: null,
	error: null,
	sortBy: { id: SortDirections.ASC },
	init(props: IAuthState): Promise<void> {
		return new Promise((resolve) => {
			set({ store: new LookupStore(props.authHeader) });
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
