import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
// const element = React.lazy(() => import('./UserProfile'));

export const UserProfilePageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.User,
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
			element: <UserSettings />,
			title: 'My Settings',
		},
	],
};
