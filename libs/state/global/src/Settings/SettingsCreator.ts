import { StateCreator, UseStore } from 'zustand';

import { ISettings } from '@xapp/shared/types';
import { ApiCallStatus, createStore, setSuccess/*, setError, setLoading*/ } from '@xapp/state/shared';

import { ISettingsState } from './ISettingsState';

const data = {
	activeHousehold: 0,
} as ISettings;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSettings: StateCreator<ISettingsState> = (set, get, api) => ({
	// store: null,
	status: ApiCallStatus.Idle,
	error: null,
	...data,
	init(): Promise<void> {
		return new Promise((resolve) => {
			resolve();
		});
	},
	setActiveHousehold(activeHousehold: number): void {
		setSuccess(set)({ activeHousehold });
	},
	clearError() {
		set({ error: null });
	},
});

export const useSettingsState: UseStore<ReturnType<typeof createSettings>> =
	createStore<ISettingsState>((set, get, api) => createSettings(set, get, api));
