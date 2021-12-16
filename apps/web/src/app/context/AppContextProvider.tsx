import React, { FC, Context, createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';

import { IKeyedRoute, INavItem, IRoute, INotifier } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';
import { useNotifier, SocketService, IRealTimeService } from '@xapp/react';
import { appConfig } from '@xapp/shared/config';

interface IAppContextProviderProps extends React.PropsWithChildren<{}> {
	routes: IAppContext['routes'];
}

export interface IAppContext {
	activeRoute: IRoute;
	routes: IKeyedRoute;
	socket: IRealTimeService;
	navigation: INavItem[];
	onActivateRoute?: (value: IRoute, location: string) => void;
}

const AppContext: Context<IAppContext> = createContext<IAppContext>({
	routes: {},
	activeRoute: null,
	navigation: null,
	socket: undefined,
	onActivateRoute: () => null,
});

let socket: IRealTimeService = null;

export const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }: IAppContextProviderProps) => {
	const { accessToken, authHeader } = useAppStore((state) => state.auth);

	const [activeRoute, setActiveRoute] = useState(null);
	const [navigation, setNavigation] = useState<INavItem[]>([]);
	const dataStore = useAppStore();
	const notifier = useNotifier();

	const ref = useRef(null);

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (accessToken === ref.current) {
				return;
			}

			socket?.stop();

			if (accessToken) {
				socket = createRealTimeService(accessToken, notifier);
				socket.start();

				const eventsListeners = {
					on: socket.on,
					off: socket.off,
					emit: socket.emit,
				};

				await dataStore.init(appConfig, notifier, { authHeader }, eventsListeners);
				await dataStore.account.getUserProfile();
				await dataStore.lookup.read();
			} else {
				setNavigation([]);
				dataStore.account.reset();
			}

			ref.current = accessToken;
		};

		bootstrap();

		return () => {
			socket?.stop();
			dataStore.account.reset();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		accessToken,
		authHeader,
		dataStore.account.reset,
		dataStore.account.getUserProfile,
		dataStore.lookup.read,
		dataStore.init,
	]);

	useEffect(() => {
		if (dataStore.lookup?.households?.length) {
			Object.assign(window, { State: dataStore });
		}
	}, [dataStore.lookup.data, dataStore]);

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

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('AppContext not provided to calling context');
	}
	return context;
};

function createRealTimeService(accessToken: string, notifier: INotifier): IRealTimeService {
	return new SocketService({
		namespace: appConfig.apiMeta.websocketEndpoint,
		options: {
			enabled: !!accessToken,
			transports: ['websocket'],
			query: { token: accessToken },
		},
		onSubscribe: (instance: IRealTimeService) => {
			instance.on('publishMessage', (data: any) => console.log(data));
			instance.on('user:connected', (data: { clientId: string }) => notifier?.info(`${data.clientId} just connected`));
			instance.on('user:disconnected', () => notifier?.info('Client disconnected'));
		},
	});
}
