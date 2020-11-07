import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const DashboardPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth    : AuthGroups.user,
	routes: [
		{
			key: PageKey.Dashboard,
			exact: true,
			path: appConfig.routes.home,
			title: 'Dashboard',
			component: React.lazy(() => import('./Dashboard')),
		},
	],
};
