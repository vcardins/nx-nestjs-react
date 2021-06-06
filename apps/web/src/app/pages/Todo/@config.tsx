import React from 'react';

import { AuthGroups, IPageConfig, LayoutStyles, PageKey } from '@xapp/shared/types';

import Todo from './Todo';
// const element = React.lazy(() => import('./Todo'));

export const TodoPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.Todo,
			caseSensitive: true,
			path: '/todos',
			element: <Todo />,
			title: 'Todo',
		},
	],
};
