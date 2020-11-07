import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const Error500PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth    : AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Error500,
			exact: true,
			path: appConfig.routes.systemError,
			component: React.lazy(() => import('./500')),
			title: 'Error 500 - System Error',
		},
	],
};
