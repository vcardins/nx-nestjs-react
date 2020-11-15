import React, { useState, useEffect } from 'react';

import { useAuth } from './AuthContextProvider';
import { AuthService } from './services/AuthService';

interface IProps {
	splashScreen: any;
	children: React.ReactElement;
}

const showMessage = (message: string) => console.info(message);

export const Authentication = ({ children, splashScreen: SplashScreen}: IProps) => {
	const {onSignOut} = useAuth();
	const [waitAuthCheck, setWaitAuthCheck] = useState<boolean>(true);
	const resolveAuthCheck = () => setWaitAuthCheck(false);

	useEffect(() => {
		AuthService.on('onAutoLogin', async () => {
			// showMessage({ message: 'Logging in with JWT'});

			try {
				// Sign in and retrieve user data from Api
				await AuthService.signInWithToken();
			}
			catch (error) {
				showMessage(error);
			}
			finally {
				resolveAuthCheck();
			}
		});

		AuthService.on('onAutoLogout', (message: string) => {
			if ( message ) {
				showMessage(message);
			}

			resolveAuthCheck();
			onSignOut();
		});

		AuthService.on('onNoAccessToken', () => {
			resolveAuthCheck();
		});

		AuthService.init();

		// Cleanup function
		return () => AuthService.off();
	}, [onSignOut]);

	return waitAuthCheck
		? <SplashScreen/>
		: children;
};
