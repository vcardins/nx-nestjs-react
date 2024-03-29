import React, { FC, Context, createContext, useEffect, useState, useRef, useMemo } from 'react';

import { IKeyedRoute, INavItem, IRoute } from '@xapp/shared/types';
import { useAppStore } from '@xapp/state';
import { useNotifier } from '@xapp/react';
import { appConfig } from '@xapp/shared/config';

export interface IAppContext {
	activeRoute: IRoute;
	routes: IKeyedRoute;

	navigation: INavItem[];
	onActivateRoute?: (value: IRoute, location: string) => void;
}

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	navigation: null,
	onActivateRoute: () => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(initialContext);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
}

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }: IAppContextProviderProps) => {
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

			if (accessToken) {
				await dataStore.init(appConfig, notifier, { authHeader });
				await dataStore.account.getUserProfile();
				await dataStore.lookup.read();
			} else {
				setNavigation([]);
				dataStore.reset();
				dataStore.account.init({ authHeader }, appConfig.endpoints );
				await dataStore.household.init({ authHeader });
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

	const value = useMemo<IAppContext>(
		() => ({
			routes,
			activeRoute,
			navigation,
			onActivateRoute: setActiveRoute,
		}),
		[routes, activeRoute, navigation]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext as appContext };
