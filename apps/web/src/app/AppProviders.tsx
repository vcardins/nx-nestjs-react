import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from '@xapp/react/auth';
import { appConfig, getTheme } from '@xapp/shared/config';
import { Themes, IKeyedRoute } from '@xapp/shared/types';

import { AppContextProvider, SocketContextProvider } from './context';

interface IAppProviders {
	children: React.ReactNode;
	routes: IKeyedRoute;
}

export const AppProviders = ({ children, routes }: IAppProviders) => (
	<ThemeProvider theme={getTheme(appConfig.theme as Themes)}>
		<AuthContextProvider>
			<AppContextProvider routes={routes}>
				<SocketContextProvider>
					<Router>{children}</Router>
				</SocketContextProvider>
			</AppContextProvider>
		</AuthContextProvider>
	</ThemeProvider>
);
