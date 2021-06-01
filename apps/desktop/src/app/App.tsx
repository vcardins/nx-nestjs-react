import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import { Layout, Menu, SplashScreen } from '@xapp/react/core';
import { IAppConfig } from '@xapp/shared/interfaces';
import { Authentication, Authorization, IAuthContext } from '@xapp/react/auth';

import { AppProviders } from './AppProviders';
import { routes, getNavigation } from './config';
import { globalStyle as GlobalStyle } from './styles';

export const App = () => (
	<AppProviders routes={routes}>
		<GlobalStyle />
		<Authorization routes={routes}>
			{({ user, onSignOut }: IAuthContext, appConfig: IAppConfig) => (
				<Authentication splashScreen={SplashScreen}>
					<Layout
						routes={routes}
						user={user}
						config={appConfig}
						sideMenu={
							<Menu
								items={getNavigation(routes, user?.groups)}
							/>
						}
						onSignOut={onSignOut}
					/>
				</Authentication>
			)}
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
