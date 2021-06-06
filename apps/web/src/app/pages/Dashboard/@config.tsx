import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import Dashboard from './Dashboard';
// const element = React.lazy(() => import('./Dashboard'));

export const DashboardPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
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
