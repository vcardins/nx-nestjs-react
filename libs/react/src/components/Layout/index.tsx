import React, { useEffect, useMemo } from 'react';
import { RouteObject } from 'react-router';
import { useRoutes, useLocation, matchRoutes } from 'react-router-dom';

import { IKeyedRoute, IRoute, ISignedUserOutput, IAppConfig } from '@xapp/shared/types';
import { Layouts } from './layouts';

interface ILayoutProps {
	routes: IKeyedRoute;
	user: ISignedUserOutput;
	sideBar?: React.ReactElement;
	topBar?: React.ReactElement;
	config: IAppConfig;
	onSignOut: () => Promise<void>;
}


export const Layout = (props: ILayoutProps) => {
	const { config, routes, user, sideBar, topBar, onSignOut } = props;
	const location = useLocation();

	const routesValues = (Object.values(routes) || []) as RouteObject[];
	const matchingRoute = matchRoutes(routesValues, location)?.[0]?.route as IRoute;
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
			sideBar={sideBar}
			topBar={topBar}
			userBar={<span/>}
		/>
	);
};
