import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/auth';

import Page500 from './500';
// const element = React.lazy(() => import('./500'));

export const Error500PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth    : AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Error500,
			caseSensitive: true,
			path: appConfig.routes.systemError,
			element: <Page500 />,
			title: 'Error 500 - System Error',
		},
	],
};
