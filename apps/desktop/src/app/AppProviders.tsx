import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';

import { AuthContextProvider } from '@xapp/react/auth';
import { getTheme, DebugRouter, IKeyedRoute } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { Themes } from '@xapp/shared/enums';

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
					<DebugRouter history={createBrowserHistory()}>
						{ children }
					</DebugRouter>
				</SocketContextProvider>
			</AppContextProvider>
		</AuthContextProvider>
	</ThemeProvider>
);
