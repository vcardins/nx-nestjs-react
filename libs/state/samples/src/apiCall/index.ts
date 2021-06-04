import { ApiCallStatus } from '@xapp/state/shared';
import { StateCreator } from 'zustand';

type Endpoint = string | (() => Promise<any>);

export interface IApiCallState<T = any> {
	endpoint?: Endpoint;
	setEndpoint: (endpoint: Endpoint) => void;
	getAll: () => Promise<void>;
	status: ApiCallStatus;
	// execute: () => Promise<void>;
	data: null | T[];
	error: null | any;
	reset: () => void;
}

export const createApiCall: StateCreator<IApiCallState> = (set, get, api) => ({
	status: ApiCallStatus.Idle,
	data: null,
	error: null,
	setEndpoint(endpoint: string) {
		set({ endpoint });
	},
	async getAll<T>() {
		const { status, endpoint } = get();

		if (status === ApiCallStatus.Loading) {
			return;
		}

		if (!endpoint) {
			throw new Error('URL is required');
		}

		set({ status: ApiCallStatus.Loading });

		try {
			let data: T[];

			if (typeof endpoint === 'string') {
				await new Promise((r) => setTimeout(r, 1000));
				const res = await fetch(endpoint);
				data = await res.json();
			}
			else {
				data = await endpoint();
			}

			set((state) => void (
				(state.status = ApiCallStatus.Success),
				(state.data = data),
				(state.error = null)
			));
		} catch (error) {
			set({
				status: ApiCallStatus.Error,
				data: null,
				error,
			});
		}
	},
	reset() {
		set({
			status: ApiCallStatus.Idle,
			data: null,
			error: null,
		});
	},
});
