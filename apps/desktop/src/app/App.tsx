import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import { Layout, Menu, SplashScreen } from '@xapp/react/core';
import { Authentication, Authorization, IAuthContext } from '@xapp/react/auth';

import { AppProviders } from './AppProviders';
import { globalStyle as GlobalStyle } from './styles';
import { routes } from './config/routes';
import { getNavigation } from './config/navigation';

export const App = () => (
	<AppProviders routes={routes}>
		<GlobalStyle />
		<Authorization routes={routes}>
			{({user, onSignOut}: IAuthContext) => (
				<Authentication splashScreen={SplashScreen}>
					<Layout
						routes={routes}
						user={user}
						sideMenu={
							<Menu
								items={getNavigation(routes, user.groups)}
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
