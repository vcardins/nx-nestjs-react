import React, { FC, Context, createContext, useEffect, useState, useRef, useMemo } from 'react';

import { IKeyedRoute, INavItem, IRoute, INotifier } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';
import { useNotifier, useSocket, UseSocketReturnType } from '@xapp/react';
import { appConfig } from '@xapp/shared/config';

export interface IAppContext {
	activeRoute: IRoute;
	routes: IKeyedRoute;
	socket: UseSocketReturnType;

	navigation: INavItem[];
	onActivateRoute?: (value: IRoute, location: string) => void;
}

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	navigation: null,
	socket: undefined,
	onActivateRoute: () => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(initialContext);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
}

export const useAuthenticatedSocket = (namespace?: string, notifier?: INotifier) =>
	(accessToken?: string) => useSocket(namespace,
		{
			enabled: !!accessToken,
			transports: ['websocket'],
			query: { token: accessToken },
		},
		// {
		// 	'user:connected': (data: { clientId: string }) => notifier?.info(`${data.clientId} just connected`),
		// 	'user:disconnected': () => notifier?.info('Client disconnected')
		// }
	);

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }: IAppContextProviderProps) => {
	const { accessToken, authHeader } = useAppStore((state) => state.auth);

	const [activeRoute, setActiveRoute] = useState(null);
	const [navigation, setNavigation] = useState<INavItem[]>([]);
	const dataStore = useAppStore();
	const notifier = useNotifier();

	const ref = useRef(null);
	const socket = useAuthenticatedSocket(appConfig.apiMeta.websocketEndpoint, notifier)(accessToken);

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (accessToken === ref.current) {
				return;
			}

			if (accessToken) {
				const eventsListeners = { on: socket.on, off: socket.off, emit: socket.emit };
				await dataStore.init(appConfig, notifier, { authHeader }, eventsListeners);
				await dataStore.account.getUserProfile();
				await dataStore.lookup.read();
			} else {
				setNavigation([]);
				dataStore.reset();
			}

			ref.current = accessToken;
		};

		bootstrap();

		return () => {
			dataStore.reset();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		accessToken,
		authHeader,
		dataStore.reset,
		dataStore.account.getUserProfile,
		dataStore.lookup.read,
		dataStore.init,
	]);

	useEffect(() => {
		if (dataStore.lookup?.households?.length) {
			Object.assign(window, { State: dataStore });
		}
	}, [dataStore.lookup.data, dataStore]);

	useEffect(() => {
		if (socket.connected) {
			console.log(socket.socket);
		}
	}, [socket.connected]);

	const value = useMemo<IAppContext>(() => ({
		routes,
		activeRoute,
		socket,
		navigation,
		onActivateRoute: setActiveRoute,
	}),
	[
		routes,
		activeRoute,
		navigation,
		socket,
	]);

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContextProvider, AppContext as appContext };
