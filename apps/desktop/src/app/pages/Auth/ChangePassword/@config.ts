import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const ChangePasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.ChangePassword,
			exact: true,
			path: appConfig.routes.changePassword,
			component: React.lazy(() => import('./ChangePassword')),
			title: 'Change Password',
		},
	],
};
