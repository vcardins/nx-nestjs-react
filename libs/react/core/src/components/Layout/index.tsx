import React, { useEffect, useMemo } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

import { matchRoutes } from './react-router';
import { IAppConfig, ISignedUserOutput } from '@xapp/shared/interfaces';

import { Layouts } from './layouts';
import { IKeyedRoute, IRoute } from '../../interfaces/IRoute';
import { PageKey } from '../../config/PageKey';
import { RouteObject } from 'react-router';

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
			// eslint-disable-next-line immutable/no-mutation
			document.title = activeRoute.title;
		}

		// eslint-disable-next-line immutable/no-mutation
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
