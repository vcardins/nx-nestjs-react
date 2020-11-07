import React from 'react';
import { Layout, SplashScreen } from '@xapp/react/core';
import { Authentication, Authorization, IAuthContext } from '@xapp/react/auth';

import { AppProviders } from './AppProviders';
import { globalStyle as GlobalStyle } from './styles';
import { routes } from './config/routes';
import { ToastContainer, Slide } from 'react-toastify';

export const App = () => (
	<AppProviders>
		<Authorization routes={routes}>
			{({user, onSignOut}: IAuthContext) => (
				<Authentication splashScreen={SplashScreen}>
					<GlobalStyle />
					<Layout
						routes={routes}
						user={user}
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
