import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { AuthGroups } from '@xapp/shared/enums';

export const AdminPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.admin,
	routes: [
		{
			key: PageKey.Admin,
			exact: true,
			path: '/admin',
			component: React.lazy(() => import('./Admin')),
			title: 'Admin',
		},
	],
};
