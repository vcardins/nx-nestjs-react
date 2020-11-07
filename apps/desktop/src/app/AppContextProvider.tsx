import React, { FC, Context, createContext, useEffect, useState, useRef, useCallback, useContext, useMemo, Dispatch, useReducer } from 'react';
import socketIOClient from 'socket.io-client';

import { ISignedUserOutput, IAppConfig, IUserPreferences } from '@xapp/shared/interfaces';
import { appConfig } from '@xapp/shared/config';
import { LocalStorage } from '@xapp/shared/services';
import { useAuth } from  '@xapp/react/auth';
import { IAppContext as ICommonAppContext, INavItem } from '@xapp/react/core';

import { TodoStore } from './pages/Todo/TodoDataStore';
import { TodoActions } from './pages/Todo/TodoActions';
import { todoReducer } from './pages/Todo/TodoReducer';
import { TodoOutput } from './pages/Todo/TodoOutput';

// eslint-disable-next-line no-console
const Console = console;

interface IAppDataContext {
	todo: TodoStore;
};

const initialState: InitialStateType = {
	todos: [],
	// meeting: new MeetingOutput(),
	// me: new MeOutput(),
	// config: new ConfigOutput(),
};

type InitialStateType = {
	todos: TodoOutput[];
	// me: MeOutput;
};

type Actions = TodoActions;


type IAppContext = ICommonAppContext<IAppDataContext>;

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	socket: null,
	userSettings: null,
	userProfile: null,
	navigation: null,
	dataContext: null,
	onUpdateUserPreferences: () => null,
	onUpdateUserProfile: () => null,
	// eslint-disable-next-line no-unused-vars
	onActivateRoute: () => null,
	onSignOut: (isTriggeredByExpiredSession?: boolean) => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(
	initialContext,
);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
	onLoadNavigation: (user: ISignedUserOutput) => INavItem[];
}

const mainReducer = (
	{ todos }: InitialStateType,
	action: TodoActions,
) => ({
	todos: todoReducer(todos, action as TodoActions),
	// me: meReducer(me, action as MeActions),
	// config: configReducer(config, action as ConfigActions),
});

const defaultUserSettings = {} as IAppConfig;

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, onLoadNavigation, routes }) => {
	const [state, dispatch] = useReducer(mainReducer, initialState);
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const {user, accessToken, onSignOut, authHeader} = useAuth();
	const [userProfile, setUserProfile] = useState(null);
	const [dataContext, setDataContext] = useState<IAppDataContext>();
	const [socket, setSocket] = useState<typeof socketIOClient.Socket>(
		socketIOClient(appConfig.apiMeta.websocketEndpoint, {transports: ['websocket']}),
	);

	// const [lookup, setLookup] = useState({} as ILookup);
	const [activeRoute, setActiveRoute] = useState(null);
	const [navItems, setNavItems] = useState<INavItem[]>([]);

	const ref = useRef(null);

	const [userSettings, setUserSettings] = useState(() => {
		const settings = LocalStorage.get(appConfig.apiMeta.userSettingsStorageKey);
		const initialSettings = settings
			? settings
			: defaultUserSettings;
		if (!settings) {
			LocalStorage.set(appConfig.apiMeta.userSettingsStorageKey, initialSettings);
		}

		return initialSettings;
	});

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (user === ref.current) {
				return;
			}

			if (user) {
				// updatedUserSettings = (userSettings || defaultUserSettings);
				try {
					socket.io.opts.query = `token=${accessToken}`;
					// on reconnection, reset the transports option, as the Websocket
					// connection may have failed (caused by proxy, firewall, browser, ...)
					socket.on('reconnect_attempt', () => {
						socket.io.opts.transports = ['polling', 'websocket'];
					});

					setSocket(socket);

					// const getSocketListener = (module: string) =>
					// 	socket.on('events', (data: any) => {
					// 		switch (data.module) {
					// 			case 'todo':
					// 				return (action: string)
					// 		}
					// 	});

					socket
						// eslint-disable-next-line no-console
						.on('disconnect', () => Console.log('Disconnected'))
						.on('exception', (data: any) => Console.log('Event', data))
						.on('onConnected', (data: any) => {
							Console.log('Connected client', data.clientId);
						})
						.on('events', (data: any) => {
							Console.log(data);
						});

					setDataContext({
						todo: new TodoStore(authHeader),
					});

					// const lookup = await api.get<ILookup>({ url: 'lookup' });
					setUserProfile(user);
					// setLookup(lookup);
					// setUserSettings(updatedUserSettings);
					setNavItems(onLoadNavigation(user));
				}
				catch (e) {
					setUserProfile(null);
				}
			}
			else {
				setNavItems([]);
				setUserProfile(null);
			}

			// LocalStorage.set(appConfig.apiMeta.userSettingsStorageKey, updatedUserSettings, !user);
			ref.current = user;
		};

		bootstrap();

		return () => {
			socket.io.opts.query = undefined;
			socket.removeAllListeners();
			setUserProfile(null);
		};
	}, [accessToken, authHeader, onLoadNavigation, socket, user]);

	const updateUserPreferences = useCallback((updates: Partial<IUserPreferences>) => {
		const updatedUserSettings = {
			...userSettings,
			...updates,
		};
		// Store to local storage when user makes any update
		LocalStorage.set(appConfig.apiMeta.userSettingsStorageKey, updatedUserSettings);
		setUserSettings(updatedUserSettings);
	}, [userSettings]);

	const value = useMemo<IAppContext>(() => ({
		routes,
			activeRoute,
			socket,
			navigation: navItems,
			userSettings,
			userProfile,
			dataContext,
			// lookup,
			onUpdateUserPreferences: updateUserPreferences,
			onUpdateUserProfile: setUserProfile,
			onActivateRoute: setActiveRoute,
			onSignOut,
	}), [routes, activeRoute, socket, navItems, userSettings, userProfile, dataContext, updateUserPreferences, onSignOut]);

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

const useApp = () => useContext(AppContext);

export {
	AppContextProvider,
	AppContext as appContext,
	useApp,
};
