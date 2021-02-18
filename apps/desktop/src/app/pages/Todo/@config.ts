import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { AuthGroups } from '@xapp/shared/enums';

export const TodoPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.Todo,
			exact: true,
			path: '/todos',
			component: React.lazy(() => import('./Todo')),
			title: 'Todo',
		},
	],
};
