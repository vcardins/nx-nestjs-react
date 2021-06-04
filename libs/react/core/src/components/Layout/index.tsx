import React, { useEffect, useMemo } from 'react';
import { RouteObject } from 'react-router';
import { useRoutes, useLocation, matchRoutes } from 'react-router-dom';

import { ISignedUserOutput } from '@xapp/shared/auth';
import { IAppConfig } from '@xapp/shared/config';

import { Layouts } from './layouts';
import { IKeyedRoute, IRoute } from '../../interfaces/IRoute';

interface ILayoutProps {
	routes: IKeyedRoute;
	user: ISignedUserOutput;
	sideMenu: React.ReactElement;
	config: IAppConfig;
	onSignOut: () => Promise<void>;
}


export const Layout = ({ config, routes, user, sideMenu, onSignOut }: ILayoutProps) => {
	const location = useLocation();

	const routesValues = (Object.values(routes) || []) as RouteObject[];
	const matchingRoute = matchRoutes(routesValues, location)[0]?.route as IRoute;
	const activeRoute = useMemo(() => matchingRoute, [matchingRoute]);

	useEffect(() => {
		if (activeRoute) {
			document.title = activeRoute.title;
		}

		return () => {
			document.title = '';
		};
	}, [activeRoute]);

	const renderedRoutes = useRoutes(routesValues.map(({ caseSensitive, path, element }) => ({ caseSensitive, path, element })));
	const PageLayout = Layouts[activeRoute.layout.style];
	const layoutId = `layout-${activeRoute.layout.style}`;

	return (
		<PageLayout
			id={layoutId}
			config={config}
			renderedRoutes={renderedRoutes}
			activeRoute={activeRoute}
			user={user}
			onSignOut={onSignOut}
			sideMenu={sideMenu}
			userMenu={<span/>}
		/>
	);
};
