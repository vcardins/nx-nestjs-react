import React, { useState, useMemo, useCallback, useContext } from 'react';

import { ISignInInput, AuthService, ISignedUserOutput } from '@xapp/shared/auth';
import { IActionResponse } from '@xapp/shared/types';

export interface IAuthContext {
	accessToken: string | null;
	user: ISignedUserOutput | null;
	authHeader: string;
	// eslint-disable-next-line camelcase
	getProviderUri: (providerKey: string) => Promise<{ redirect_uri: string }>;
	getOauthAccessToken?: (providerKey: string, code: string) => Promise<{token: string}>;
	onSignIn: (props: ISignInInput) => Promise<ISignedUserOutput> | Promise<IActionResponse>;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
	isSessionValid: () => boolean;
}

const initialContext: IAuthContext = {
	accessToken: null,
	user: null,
	// eslint-disable-next-line no-unused-vars
	getProviderUri: () => null,
	getOauthAccessToken: () => null,
	authHeader: null,
	// eslint-disable-next-line no-unused-vars
	onSignIn: () => null,
	onSignOut: () => null,
	isSessionValid: () => false,
};

export const AuthContext: React.Context<IAuthContext> = React.createContext<IAuthContext>(
	initialContext,
);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState(AuthService.getUser());
	const [accessToken, setAccessToken] = useState(AuthService.getAccessToken());

	const handleSignIn = useCallback(async (props: ISignInInput) => {
		// eslint-disable-next-line camelcase
		const { user, access_token } = await AuthService.signInWithEmailAndPassword(props);
		setUser(user);
		setAccessToken(access_token);

		return user;
	}, []);

	const handleSignOut = useCallback(async (isTriggeredByExpiredSession?: boolean) => {
		if (isTriggeredByExpiredSession === true) {
			console.info('Session has expired');
		}

		await AuthService.signOut();
		setUser(null);
	}, []);

	const isSessionValid = useCallback(() => AuthService.isUserSessionValid(), []);
	const getProviderUri = useCallback((provider: string) => AuthService.getProviderUri(provider), []);
	const getOauthAccessToken = useCallback((provider: string, code: string) => AuthService.getOauthAccessToken(provider, code), []);

	const value = useMemo<IAuthContext>(() => ({
		accessToken,
		user,
		authHeader: AuthService.getAuthHeader(),
		getProviderUri,
		getOauthAccessToken,
		isSessionValid,
		onSignIn: handleSignIn,
		onSignOut: handleSignOut,
	}), [
		user,
		accessToken,
		handleSignIn,
		handleSignOut,
		getOauthAccessToken,
		getProviderUri,
		isSessionValid,
	]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

