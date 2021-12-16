/* eslint-disable no-param-reassign */
import { State, StateCreator, SetState, GetState, StoreApi, Subscribe } from 'zustand';

export const namespace = <K extends string, S extends State>(
	key: K,
	creator: StateCreator<S>,
): (liftedSet: SetState<any>, liftedGet: GetState<any>, liftedApi: StoreApi<any>) => S =>
	(liftedSet: SetState<any>, liftedGet: GetState<any>, liftedApi: StoreApi<any>) => {
		const setState: any = (updates: S | ((data: S) => S), replace?: boolean) => {
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
		const getState: GetState<S> = () => liftedGet()[key];
		const subscribe = ((listener: any, selector: any, equalityFn?: any) => {
			if (selector) {
				return liftedApi.subscribe(listener, (state: any) => selector(state[key]), equalityFn);
			}
			return liftedApi.subscribe(listener, (state: any) => state[key]);
		}) as Subscribe<S>;
		const destroy = () => {
			// todo?
			// - remove state slice
			// - unsubscribe listeners
		};
		const api = { getState, setState, subscribe, destroy };

		return creator(setState, getState, api);
}
