import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

import Page404 from './404';
// const element = React.lazy(() => import('./404'));

export const Error404PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth    : AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Error404,
			caseSensitive: true,
			path: appConfig.routes.notFound,
			element: <Page404 />,
			title: 'Error 404 - Not Found',
		},
	],
};
