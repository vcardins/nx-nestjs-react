import {  UseStore } from 'zustand';

import { createStore, namespace, Namespaces, IAuthState } from '@xapp/state/shared';

import { createTodo }  from '@xapp/state/todo';
import { createApiCall, createCounter, createForm } from '../samples/src';
import { createLookup } from '../global/src';
import { createAccount } from '../account/src';
import { IEndpointsConfig } from '@xapp/shared/interfaces';

export type AppState = {
	counter: ReturnType<typeof createCounter>;
	form: ReturnType<typeof createForm>;
	apiCall: ReturnType<typeof createApiCall>;
	todo: ReturnType<typeof createTodo>;
	lookup: ReturnType<typeof createLookup>;
	account: ReturnType<typeof createAccount>;
	setAuthInfo: (props: IAuthState, endpoints: IEndpointsConfig) => void;
	resetAuthInfo: () => void;
};

export const useStore: UseStore<AppState> = createStore((set, get, api) => {
	const counter = namespace(Namespaces.Counter, createCounter)(set, get, api);
	const form = namespace(Namespaces.Form, createForm)(set, get, api);
	const apiCall = namespace(Namespaces.ApiCall, createApiCall)(set, get, api);
	const todo = namespace(Namespaces.Todo, createTodo)(set, get, api);
	const lookup = namespace(Namespaces.Lookup, createLookup)(set, get, api);
	const account = namespace(Namespaces.Account, createAccount)(set, get, api);

	const setAuthInfo = (props: IAuthState, endpoints: IEndpointsConfig) => {
		todo.init(props)
		lookup.init(props);
		account.init(props, endpoints);
	};

	const resetAuthInfo = () => {
		todo.reset();
	};

	return {
		todo,
		counter,
		form,
		lookup,
		account,
		apiCall,
		setAuthInfo,
		resetAuthInfo,
	};
});
