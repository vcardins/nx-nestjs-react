import React, { useCallback, useMemo } from 'react';
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

import { AppContextProvider, SocketContextProvider } from './context';

export const App = () => {
	const dataStore = useAppStore();
	const { user, onSignOut } = useMemo(() => dataStore.auth, [dataStore.auth]);
	const lookupStore = useMemo(() => dataStore.lookup, [dataStore.lookup]);

	const { routes, navigation } = useMemo(() => {
		const routes = getRoutes(user?.roles);
		const navigation = getNavigation(routes, user?.roles);
		return {
			routes,
			navigation
		};
	}, [user?.roles]);

	const handleHouseholdChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = +e.target.value;
		lookupStore.setActiveHousehold(id);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[lookupStore.setActiveHousehold]);

	const houseHoldSelect = useMemo(() => {
		const options = lookupStore.households
			? lookupStore.households.map(({ id, name }) => ({ id, name }))
			: [];

		if (!options.length) {
			return null;
		}

		return (
			<select
				name="activeHousehold"
				value={lookupStore.activeHousehold}
				onChange={handleHouseholdChange}
			>
				{ options.map(({ id, name }) => (<option key={id} value={id}>{name}</option>)) }
			</select>
		);
	}, [lookupStore.households, lookupStore.activeHousehold, handleHouseholdChange]);

	return (
		<AppProviders routes={routes}>
			<GlobalStyle />
			<Authorization routes={routes}>
				<Layout
					routes={routes}
					user={user}
					config={appConfig}
					sideBar={<Menu items={navigation} />}
					topBar={houseHoldSelect}
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
				<SocketContextProvider>
					<Router>{props.children}</Router>
				</SocketContextProvider>
			</AppContextProvider>
		</ThemeProvider>
	);
}
