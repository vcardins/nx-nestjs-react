import React from 'react';

import { AuthRoles, IPageConfig, LayoutStyles, PageKey } from '@xapp/shared/types';

import Household from './Household';
// const element = React.lazy(() => import('./Household'));

export const HouseholdPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthRoles.user,
	routes: [
		{
			key: PageKey.Household,
			caseSensitive: true,
			path: '/households',
			element: <Household />,
			title: 'Household',
		},
	],
};
