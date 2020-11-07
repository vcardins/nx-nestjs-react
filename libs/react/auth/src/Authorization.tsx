import React, { useEffect, useCallback } from 'react';
import { matchRoutes } from 'react-router-config';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { appConfig } from '@xapp/shared/config';
import { IRoute, IKeyedRoute, PageKey } from '@xapp/react/core';

import { useAuth } from './AuthContextProvider';
import { hasRoutePermission } from './helpers/routes';
import { IAuthContext } from './interfaces/IAuthContext';

interface IAuthorizationProps {
	children: (authContext: IAuthContext) => React.ReactElement;
	routes: IKeyedRoute;
	onActivateRoute?: (route: IRoute, pathname: string) => void;
}

/**
 *
 * 1. If user === null
 * 1. Requested location is doesn't allow guest, redirect to login
 *	2. Requested location allow guest, redirect
 * 2. If user !== null
 *	1. Requested location == login, redirect to login
 *3. In any case, if the requested route doesn't exist, redirect anyone so
	it's handled by NotFoundPage route
*/

function showNotAuthorizedError(location: string) {
	toast.error(`You\'re not authorized to access ${location}`);
}

interface IState {
	redirectUrl: string
	pathname?: string;
}

export const Authorization = ({children, routes}: IAuthorizationProps) => {
	const location = useLocation<{ redirectUrl?: string }>();
	const history = useHistory<IState>();
	const {user, isSessionValid, onSignOut} = useAuth();

	const getMatchedRoute = useCallback((pathname: string): IRoute => {
		const { route = {} } = matchRoutes(Object.values(routes), pathname)[0];
		return route as IRoute;
	}, [routes]);

	const handleRouteRedirection = useCallback(() => {
		let pathname: string;
		let state: IState;
		const allowAccess = isAccessAllowed();
		const notLoginLocation = location.pathname !== appConfig.routes.signIn;

		/*
		User is guest, redirect to Login Page
		*/
		if (!user?.groups?.length) {
			// If the requested location is NOT login and the access is not allowed redirect to login
			if (notLoginLocation && !allowAccess) {
				pathname = appConfig.routes.signIn;
				state = { redirectUrl: location.pathname };
			}
		}
		/*
		User is member
		User must be on unAuthorized page or just logged in
		Redirect to dashboard or redirectUrl
		*/
		else {
			// if the request location is login but user is logged in
			// then redirect to home
			if (!allowAccess) {
				if (notLoginLocation) {
					showNotAuthorizedError(location.pathname);
				}
				pathname = appConfig.routes.home;
			}
			else {
				pathname = location.state?.redirectUrl
					? location.state.redirectUrl
					: location.pathname || appConfig.routes.home;
			}
		}

		if (pathname && pathname !== history.location.pathname) {
			history.push(pathname, state);
		}
	}, [history, isAccessAllowed, location.pathname, location?.state?.redirectUrl, user?.groups?.length]);

	useEffect(() => {
		// It listen route changes in order to:
		const historyListener = history.listen((location) => {
			if (!user) {
				return;
			}

			const route = getMatchedRoute(location.pathname);

			// 1. Check whether the session has expired and warn the user asking to login again
			if (!isSessionValid()) {
				return onSignOut(route.key !== PageKey.SignIn);
			}

			// 2. Verify whether the user (group) is allowed to access the route
			// If NOT display an error message and redirect to the home page
			if (!isAccessAllowed()) {
				showNotAuthorizedError(route.path as string);
				history.push(appConfig.routes.home);
			}
		});

		return () => historyListener();
	}, [getMatchedRoute, history, isAccessAllowed, isSessionValid, location, onSignOut, user]);

	useEffect(() => {
		handleRouteRedirection();
	}, [handleRouteRedirection, user]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function isAccessAllowed() {
		const { auth } = getMatchedRoute(history.location.pathname);

		return hasRoutePermission(auth, user?.groups);
	}

	return children(useAuth());
};
