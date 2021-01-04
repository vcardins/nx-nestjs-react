import React, { useEffect, useMemo } from 'react';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { useLocation } from 'react-router-dom';

import { ISignedUserOutput } from '@xapp/shared/interfaces';
import { IRoute, IKeyedRoute } from '../../interfaces/IRoute';
import { Layouts } from './layouts';

interface ILayoutProps {
	routes: IKeyedRoute;
	user: ISignedUserOutput;
	onSignOut: () => Promise<void>;
}

export const Layout = ({ routes, user, onSignOut }: ILayoutProps) => {
	const {pathname } = useLocation();
	const routesValues = Object.values(routes) || [];
	const matchingRoute = matchRoutes(routesValues, pathname)[0];
	const activeRoute = useMemo(() => matchingRoute?.route as IRoute, [matchingRoute]);

	useEffect(() => {
		if (activeRoute) {
			// eslint-disable-next-line immutable/no-mutation
			document.title = activeRoute.title;
		}

		// eslint-disable-next-line immutable/no-mutation
		return () => document.title = '';
	}, [activeRoute]);

	const renderedRoutes = renderRoutes(routesValues);
	const PageLayout = Layouts[activeRoute.layout.style];
	const layoutId = `layout-${activeRoute.layout.style}`;

	return (
		<PageLayout
			id={layoutId}
			renderedRoutes={renderedRoutes}
			activeRoute={activeRoute}
			user={user}
			onSignOut={onSignOut}
			sideMenu={<span/>}
			userMenu={<span/>}
		/>
	);
};
