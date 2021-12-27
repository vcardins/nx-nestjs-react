import React, { useEffect, useCallback } from 'react';

import { toast } from 'react-toastify';
import { Location } from 'history';
import { RouteObject } from 'react-router';
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom';

import { appConfig } from '@xapp/shared/config';
import { IRoute, IKeyedRoute, PageKey } from '@xapp/shared/types';
import { hasRoutePermission } from '@xapp/shared/utils';
import { useAppStore } from '@xapp/state';

interface IAuthorizationProps {
	children: React.ReactElement;
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
	toast.error(`You're not authorized to access ${location}`);
}

interface IState {
	redirectUrl: string
	pathname?: string;
}

interface CustomLocation extends Location {
	state: IState;
}

export const Authorization = ({ children, routes }: IAuthorizationProps) => {
	const location = useLocation() as CustomLocation;
	const navigate = useNavigate();
	const { user, isSessionValid, onSignOut } = useAppStore((state) => state.auth);
	const isPrivatePage = ![
		appConfig.routes.signIn,
		appConfig.routes.signUp,
		appConfig.routes.resetPassword,
	].includes(location.pathname);

	const getMatchedRoute = useCallback((pathname: string): IRoute => {
		const routeObjects = Object.values(routes) as RouteObject[];
		const matchedRoute = matchRoutes(routeObjects, pathname)?.[0]?.route as IRoute;

		return matchedRoute ? matchedRoute : null;
	}, [routes]);

	const handleRouteRedirection = useCallback(() => {
		let pathname: string;
		let state: IState;

		/*
		User is guest, redirect to Login Page
		*/
		if (!user?.roles?.length) {
			// If the requested location is NOT login and the access is not allowed redirect to login
			if (isPrivatePage || !isAccessAllowed()) {
				pathname = appConfig.routes.signIn;
				state = { redirectUrl: location.pathname } as IState;
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
			if (!isAccessAllowed()) {
				if (isPrivatePage) {
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

		if (pathname && pathname !== location.pathname) {
			navigate(pathname, { state });
		}
	}, [
		navigate,
		isAccessAllowed,
		isPrivatePage,
		location.pathname,
		location?.state?.redirectUrl,
		user?.roles?.length,
	]);

	useEffect(() => {
		// It listen route changes in order to:
		const historyListener = async () => {
			if (!user) {
				return;
			}

			const route = getMatchedRoute(location.pathname);

			// 1. Check whether the session has expired and warn the user asking to login again
			if (!isSessionValid()) {
				return onSignOut(route.key !== PageKey.SignIn);
			}

			// // 2. Verify whether the user (group) is allowed to access the route
			// // If NOT display an error message and redirect to the home page
			if (!isAccessAllowed() && isPrivatePage) {
				showNotAuthorizedError(route.path as string);
				navigate(appConfig.routes.home);
			}
		};

		historyListener();

	// 	// return () => historyListener();
	}, [
		getMatchedRoute,
		isPrivatePage,
		navigate,
		isAccessAllowed,
		isSessionValid,
		location.pathname,
		onSignOut,
		user,
	]);

	useEffect(() => {
		handleRouteRedirection();
	}, [handleRouteRedirection, user]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	function isAccessAllowed() {
		const route = getMatchedRoute(location.pathname);
		return hasRoutePermission(route.auth, user?.roles);
	}

	return children;
};
