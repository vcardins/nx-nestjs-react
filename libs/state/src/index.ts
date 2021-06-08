import {  UseStore } from 'zustand';

import { createStore, namespace, Namespaces, IAuthState } from '@xapp/state/shared';

import { createTodo }  from '@xapp/state/todo';
import { createLookup } from '@xapp/state/global';
import { createAccount } from '@xapp/state/account';
import { createHousehold } from '@xapp/state/household';
import { IEndpointsConfig } from '@xapp/shared/config';

export type AppState = {
	todo: ReturnType<typeof createTodo>;
	lookup: ReturnType<typeof createLookup>;
	account: ReturnType<typeof createAccount>;
	household: ReturnType<typeof createHousehold>;
	setAuthInfo: (props: IAuthState, endpoints: IEndpointsConfig) => void;
	resetAuthInfo: () => void;
};

export const useStore: UseStore<AppState> = createStore((set, get, api) => {
	const todo = namespace(Namespaces.Todo, createTodo)(set, get, api);
	const lookup = namespace(Namespaces.Lookup, createLookup)(set, get, api);
	const account = namespace(Namespaces.Account, createAccount)(set, get, api);
	const household = namespace(Namespaces.Household, createHousehold)(set, get, api);

	const setAuthInfo = (props: IAuthState, endpoints: IEndpointsConfig) => {
		todo.init(props);
		lookup.init(props);
		household.init(props);
		account.init(props, endpoints);
	};

	const resetAuthInfo = () => {
		todo.reset();
	};

	return {
		todo,
		lookup,
		account,
		household,
		setAuthInfo,
		resetAuthInfo,
	};
});
