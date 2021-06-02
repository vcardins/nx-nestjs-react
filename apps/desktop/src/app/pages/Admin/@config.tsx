import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { AuthGroups } from '@xapp/shared/enums';

import Admin from './Admin';
// const element = React.lazy(() => import('./Admin'));

export const AdminPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.admin,
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
