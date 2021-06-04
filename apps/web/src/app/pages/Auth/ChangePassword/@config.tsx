import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/auth';

import ChangePassword from './ChangePassword';
// const element = React.lazy(() => import('./ChangePassword'));

export const ChangePasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.ChangePassword,
			caseSensitive: true,
			path: appConfig.routes.changePassword,
			element: <ChangePassword />,
			title: 'Change Password',
		},
	],
};
