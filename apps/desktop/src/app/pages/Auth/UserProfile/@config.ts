import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const UserProfilePageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.UserProfile,
			exact: true,
			path: appConfig.routes.userProfile,
			component: React.lazy(() => import('./UserProfile')),
			title: 'My Profile',
		},
		{
			key: PageKey.UserSettings,
			exact: true,
			path: '/user-settings',
			component: React.lazy(() => import('./UserSettings')),
			title: 'My Settings',
		},
	],
};
