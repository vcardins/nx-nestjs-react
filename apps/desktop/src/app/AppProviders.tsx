import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';

import { AuthContextProvider } from '@xapp/react/auth';
import { getTheme, DebugRouter } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { ISignedUserOutput } from '@xapp/shared/interfaces';
import { Themes } from '@xapp/shared/enums';

import { routes } from './config/routes';
import { getNavigation } from './config/navigation';
import { AppContextProvider } from './AppContextProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
	<ThemeProvider theme={getTheme(appConfig.theme as Themes)}>
		<AuthContextProvider>
			<AppContextProvider
				routes={routes}
				onLoadNavigation={(user: ISignedUserOutput) => getNavigation(routes, user.groups)}
			>
				<DebugRouter history={createBrowserHistory()}>
					{children}
				</DebugRouter>
			</AppContextProvider>
		</AuthContextProvider>
	</ThemeProvider>
);
