import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout, Menu } from '@xapp/react/core';
import { appConfig, getTheme } from '@xapp/shared/config';
import { useStore } from '@xapp/state';
import { IKeyedRoute, Themes } from '@xapp/shared/types';

import { Authorization } from './Authorization';
import { routes, getNavigation } from './config';
import { globalStyle as GlobalStyle } from './styles';

import { AppContextProvider, SocketContextProvider } from './context';

export const App = () => {
	const dataStore = useStore();
	const { user, onSignOut } = dataStore.auth;

	return (
		<AppProviders routes={routes}>
			<GlobalStyle />
			<Authorization routes={routes}>
				<Layout
					routes={routes}
					user={user}
					config={appConfig}
					sideMenu={
						<Menu items={getNavigation(routes, user?.groups)} />
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
	const { children, routes } = props;
	return (
		<ThemeProvider theme={getTheme(appConfig.theme as Themes)}>
			<AppContextProvider routes={routes}>
				<SocketContextProvider>
					<Router>{children}</Router>
				</SocketContextProvider>
			</AppContextProvider>
		</ThemeProvider>
	);
}
