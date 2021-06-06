import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import Page500 from './500';
// const element = React.lazy(() => import('./500'));

export const Error500PageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
		config: {},
	},
	auth: AuthGroups.everyone,
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
