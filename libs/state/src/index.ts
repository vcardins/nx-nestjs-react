import { UseStore } from 'zustand';

import { INotifier, IAppConfig } from '@xapp/shared/types';
import { createStore, namespace, Namespaces, IAuthState } from '@xapp/state/shared';
import { createTodo }  from '@xapp/state/todo';
import { createAuth } from '@xapp/state/auth';
import { createLookup } from '@xapp/state/global';
import { createAccount } from '@xapp/state/account';
import { createHousehold } from '@xapp/state/household';
import { createTask } from '@xapp/state/task';
import { createTaskTemplate } from '@xapp/state/task-template';

export type AppState = {
	config?: IAppConfig;
	notifier?: INotifier;
	account: ReturnType<typeof createAccount>;
	auth: ReturnType<typeof createAuth>;
	household: ReturnType<typeof createHousehold>;
	lookup: ReturnType<typeof createLookup>;
	todo: ReturnType<typeof createTodo>;
	task: ReturnType<typeof createTask>;
	taskTemplate: ReturnType<typeof createTaskTemplate>;
	init: (appConfig: IAppConfig, notifier: INotifier, authState: IAuthState) => Promise<void>;
	reset: () => void;
};

export const useStore: UseStore<AppState> = createStore((set, get, api) => {
	const account = namespace(Namespaces.Account, createAccount)(set, get, api);
	const auth = namespace(Namespaces.Auth, createAuth)(set, get, api);
	const household = namespace(Namespaces.Household, createHousehold)(set, get, api);
	const lookup = namespace(Namespaces.Lookup, createLookup)(set, get, api);
	const todo = namespace(Namespaces.Todo, createTodo)(set, get, api);
	const task = namespace(Namespaces.Task, createTask)(set, get, api);
	const taskTemplate = namespace(Namespaces.TaskTemplate, createTaskTemplate)(set, get, api);

	const init = async (appConfig: IAppConfig, notifier: INotifier, authState: IAuthState): Promise<void> => {
		set((state) => void (
			(state.config = appConfig),
			(state.notifier = notifier)
		));

		account.init(authState, appConfig.endpoints);
		await household.init(authState);
		await lookup.init(authState);
		await todo.init(authState);
		await task.init(authState);
		await taskTemplate.init(authState);
	};

	return {
		config: null,
		notifier: null,
		todo,
		lookup,
		init,
		auth,
		account,
		household,
		reset: account.reset,
		task,
		taskTemplate,
	};
});
