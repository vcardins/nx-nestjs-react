import React from 'react';

import { IPageConfig, AuthRoles, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';

import Dashboard from './Dashboard';
// const element = React.lazy(() => import('./Dashboard'));

export const DashboardPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthRoles.user,
	routes: [
		{
			key: PageKey.Dashboard,
			caseSensitive: true,
			path: appConfig.routes.home,
			title: 'Dashboard',
			element: <Dashboard />,
		},
	],
};
