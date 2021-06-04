/* eslint-disable no-param-reassign */
import { State as ZustandState, StateCreator, SetState, GetState, StoreApi, Subscribe } from 'zustand';

export function namespace<K extends string, T extends ZustandState>(
	key: K,
	creator: StateCreator<T>,
): (liftedSet: SetState<any>, liftedGet: GetState<any>, liftedApi: StoreApi<any>) => T {
	return (liftedSet: SetState<any>, liftedGet: GetState<any>, liftedApi: StoreApi<any>) => {
		const setState: any = (updates: any, replace?: boolean) => {
			liftedSet((liftedState: any) => {
				if (typeof updates === 'function') {
					updates = updates(liftedState[key]);
				}
				if (!replace) {
					updates = { ...liftedState[key], ...updates };
				}

				void (liftedState[key] = updates);
				// The following should be returned if immer is not used
				// return {
				// 	...liftedState,
				// 	[key]: updates,
				// };
			}, replace);
		};
		const getState: GetState<T> = () => liftedGet()[key];
		const subscribe = ((listener: any, selector: any, equalityFn?: any) => {
			if (selector) {
				return liftedApi.subscribe(listener, (state: any) => selector(state[key]), equalityFn);
			}
			return liftedApi.subscribe(listener, (state: any) => state[key]);
		}) as Subscribe<T>;
		const destroy = () => {
			// todo?
			// - remove state slice
			// - unsubscribe listeners
		};
		const api = { getState, setState, subscribe, destroy };

		return creator(setState, getState, api);
	};
}
