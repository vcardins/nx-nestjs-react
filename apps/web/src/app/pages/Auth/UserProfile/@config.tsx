import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import UserProfile from './UserProfile';
// const element = React.lazy(() => import('./UserProfile'));

export const UserProfilePageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.UserProfile,
			caseSensitive: true,
			path: appConfig.routes.userProfile,
			element: <UserProfile />,
			title: 'My Profile',
		},
		{
			key: PageKey.UserSettings,
			caseSensitive: true,
			path: '/user-settings',
			element: React.lazy(() => import('./UserSettings')),
			title: 'My Settings',
		},
	],
};
