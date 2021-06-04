import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/auth';

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
