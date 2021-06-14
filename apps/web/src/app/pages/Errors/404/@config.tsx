import React from 'react';

import { IPageConfig, AuthRoles, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import Page404 from './404';
// const element = React.lazy(() => import('./404'));

export const Error404PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth: AuthRoles.everyone,
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
