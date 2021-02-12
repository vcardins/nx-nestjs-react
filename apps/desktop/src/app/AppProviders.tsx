import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';

import { AuthContextProvider } from '@xapp/react/auth';
import { getTheme, DebugRouter, IKeyedRoute } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { Themes } from '@xapp/shared/enums';

import { AppContextProvider } from './AppContextProvider';

interface IAppProviders {
	children: React.ReactNode;
	routes: IKeyedRoute;
}

export const AppProviders = ({ children, routes }: IAppProviders) => (
	<ThemeProvider theme={getTheme(appConfig.theme as Themes)}>
		<AuthContextProvider>
			<AppContextProvider routes={routes}>
				<DebugRouter history={createBrowserHistory()}>
					{children}
				</DebugRouter>
			</AppContextProvider>
		</AuthContextProvider>
	</ThemeProvider>
);
