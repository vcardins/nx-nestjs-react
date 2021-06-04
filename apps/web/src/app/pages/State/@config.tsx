import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { AuthGroups } from '@xapp/shared/auth';

import State from './State';
// const element = React.lazy(() => import('./State'));

export const StatePageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.State,
			caseSensitive: true,
			path: '/state',
			title: 'State',
			element: <State />,
		},
	],
};
