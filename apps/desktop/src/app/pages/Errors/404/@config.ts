import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const Error404PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth    : AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Error404,
			exact: true,
			path: appConfig.routes.notFound,
			component: React.lazy(() => import('./404')),
			title: 'Error 404 - Not Found',
		},
	],
};
