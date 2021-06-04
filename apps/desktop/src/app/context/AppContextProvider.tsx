import React, { FC, Context, createContext, useEffect, useState, useRef, useMemo } from 'react'; // , Dispatch, useReducer

import { IAppContext, INavItem } from '@xapp/react/core';
import { useAuth } from '@xapp/react/auth';
import { appConfig } from '@xapp/shared/config';

import { useStore } from '@xapp/state';

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	navigation: null,
	onActivateRoute: () => null,
	onSignOut: () => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(initialContext);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
}

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }: IAppContextProviderProps) => {
	const { accessToken, onSignOut, authHeader } = useAuth();

	const [activeRoute, setActiveRoute] = useState(null);
	const [navigation, setNavigation] = useState<INavItem[]>([]);
	const dataStore = useStore();

	const ref = useRef(null);

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (accessToken === ref.current) {
				return;
			}

			if (accessToken) {
				dataStore.setAuthInfo({ authHeader }, appConfig.endpoints);

				await dataStore.account.getUserProfile();
				await dataStore.lookup.read();
			}
			else {
				setNavigation([]);
				dataStore.resetAuthInfo();
			}

			ref.current = accessToken;
		};

		bootstrap();

		return () => {
			dataStore.resetAuthInfo();
		};
	}, [
		accessToken,
		authHeader,
		dataStore.resetAuthInfo,
		dataStore.account.getUserProfile,
		dataStore.lookup.read,
		dataStore.setAuthInfo,
	]);

	const value = useMemo<IAppContext>(
		() => ({
			routes,
			activeRoute,
			navigation,
			onActivateRoute: setActiveRoute,
			onSignOut,
		}),
		[routes, activeRoute, navigation, onSignOut],
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export {
	AppContextProvider,
	AppContext as appContext,
};
