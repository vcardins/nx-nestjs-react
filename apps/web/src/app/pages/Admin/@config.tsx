import React from 'react';

import { IPageConfig, AuthRoles, LayoutStyles, PageKey } from '@xapp/shared/types';

import Admin from './Admin';
// const element = React.lazy(() => import('./Admin'));

export const AdminPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthRoles.admin,
	routes: [
		{
			key: PageKey.Admin,
			caseSensitive: true,
			path: '/admin',
			element: <Admin />,
			title: 'Admin',
		},
	],
};
