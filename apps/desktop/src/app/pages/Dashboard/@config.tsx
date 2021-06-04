import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

import Dashboard from './Dashboard';
// const element = React.lazy(() => import('./Dashboard'));

export const DashboardPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth    : AuthGroups.user,
	routes: [
		{
			key: PageKey.Dashboard,
			caseSensitive: true,
			path: appConfig.routes.home,
			title: 'Dashboard',
			element: <Dashboard/>,
		},
	],
};
