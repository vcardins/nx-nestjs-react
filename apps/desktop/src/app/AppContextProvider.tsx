import React, { FC, Context, createContext, useEffect, useState, useRef, useContext, useMemo } from 'react'; // , Dispatch, useReducer
import { io } from 'socket.io-client';

import { IAppContext as ICommonAppContext, INavItem } from '@xapp/react/core';
import { ISignedUserOutput, IUserProfileInput, ILookup } from '@xapp/shared/interfaces';
import { useAuth } from  '@xapp/react/auth';
import { appConfig } from '@xapp/shared/config';

import { TodoStore } from './pages/Todo/TodoDataStore';
import { AccountStore } from './pages/Auth/AccountDataStore';
import { LookupStore } from './pages/Lookup/LookupDataStore';

// eslint-disable-next-line no-console
const Console = console;

interface IAppDataContext {
	todo: TodoStore;
	lookup: LookupStore;
	account: AccountStore;
};


type IAppContext = ICommonAppContext<IAppDataContext>;

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	socket: null,
	user: null,
	lookup: null,
	navigation: null,
	dataContext: null,
	onUpdateUserProfile: () => null,
	onActivateRoute: () => null,
	onSignOut: () => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(
	initialContext,
);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
}

// const mainReducer = (
// 	{ todos }: InitialStateType,
// 	action: TodoActions,
// ) => ({
// 	todos: todoReducer(todos, action as TodoActions),
// 	// me: meReducer(me, action as MeActions),
// 	// config: configReducer(config, action as ConfigActions),
// });

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }) => {
	// const [state, dispatch] = useReducer(mainReducer, initialState);
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const {accessToken, onSignOut, authHeader} = useAuth();
	const [user, setUser] = useState<ISignedUserOutput>(null);
	const [lookup, setLookup] = useState<ILookup>(null);
	const [dataContext, setDataContext] = useState<IAppDataContext>();
	const [socket, setSocket] = useState<ReturnType<typeof io>>(null);

	// const [lookup, setLookup] = useState({} as ILookup);
	const [activeRoute, setActiveRoute] = useState(null);
	const [navigation, setNavigation] = useState<INavItem[]>([]);

	const ref = useRef(null);

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (accessToken === ref.current) {
				return;
			}

			if (accessToken) {
				try {
					const dataStores = {
						todo: new TodoStore(authHeader),
						lookup: new LookupStore(authHeader),
						account: new AccountStore(authHeader, appConfig.endpoints),
					};

					const userInfo = await dataStores.account.getUserProfile();
					setLookup(await dataStores.lookup.read());

					const updatedSocket = io({
						path: appConfig.apiMeta.websocketEndpoint,
						query: { token: accessToken },
						transports: ['websocket'],
					});

					updatedSocket.connect();
					// on reconnection, reset the transports option, as the Websocket
					// connection may have failed (caused by proxy, firewall, browser, ...)
					// socket.on('reconnect_attempt', () => {
					// 	socket.io.opts.transports = ['polling', 'websocket'];
					// });

					// const getSocketListener = (module: string) =>
					// 	socket.on('events', (data: any) => {
					// 		switch (data.module) {
					// 			case 'todo':
					// 				return (action: string)
					// 		}
					// 	});

					updatedSocket
						// eslint-disable-next-line no-console
						.on('disconnect', () => Console.log('Disconnected'))
						.on('exception', (data: any) => Console.log('Event', data))
						.on('connected', (data: any) => {
							Console.log('Connected client', data.clientId);
						})
						.on('events', (data: any) => {
							Console.log(data);
						});

					setDataContext(dataStores);
					setSocket(updatedSocket);
					setUser(userInfo);
				}
				catch (e) {
					setUser(null);
				}
			}
			else {
				setNavigation([]);
				setUser(null);
			}

			ref.current = accessToken;
		};

		bootstrap();

		return () => {
			socket?.disconnect();
			setUser(null);
		};
	}, [accessToken, authHeader]);

	const value = useMemo<IAppContext>(() => ({
		routes,
		activeRoute,
		socket,
		navigation,
		user,
		lookup,
		dataContext,
		onUpdateUserProfile: (profile: IUserProfileInput) => setUser({...user, profile}),
		onActivateRoute: setActiveRoute,
		onSignOut,
	}), [routes, activeRoute, socket, navigation, user, dataContext, onSignOut]);

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
