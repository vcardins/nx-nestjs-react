import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout, Menu } from '@xapp/react';
import { appConfig, getTheme } from '@xapp/shared/config';
import { useAppStore } from '@xapp/state';
import { IKeyedRoute, Themes } from '@xapp/shared/types';

import { Authorization } from './Authorization';
import { getRoutes, getNavigation } from './config';
import { globalStyle as GlobalStyle } from './styles';

import { AppContextProvider } from './context';
import { HouseholdSelector } from './components';

export const App = () => {
	const dataStore = useAppStore();
	const { user, onSignOut } = dataStore.auth;

	const { routes, navigation } = useMemo(() => {
		const routes = getRoutes(user?.roles);
		const navigation = getNavigation(routes, user?.roles);
		return {
			routes,
			navigation
		};
	}, [user?.roles]);

	return (
		<AppProviders routes={routes}>
			<GlobalStyle />
			<Authorization routes={routes}>
				<Layout
					routes={routes}
					user={user}
					config={appConfig}
					sideBar={
						<Menu items={navigation} />
					}
					topBar={
						<HouseholdSelector
							items={dataStore.lookup.households}
							activeHousehold={dataStore.settings.activeHousehold}
							onActivateHousehold={dataStore.settings.setActiveHousehold}
						/>
					}
					onSignOut={onSignOut}
				/>
			</Authorization>
			<ToastContainer
				position="bottom-right"
				transition={Slide}
				autoClose={2500}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
			/>
		</AppProviders>
	);
}

function AppProviders (props: { children: React.ReactNode; routes: IKeyedRoute }) {
	return (
		<ThemeProvider theme={getTheme(appConfig.theme as Themes)}>
			<AppContextProvider routes={props.routes}>
				<Router>{props.children}</Router>
			</AppContextProvider>
		</ThemeProvider>
	);
}
