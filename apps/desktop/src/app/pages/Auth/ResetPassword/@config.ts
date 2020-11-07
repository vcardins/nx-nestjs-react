import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const ResetPasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.ResetPassword,
			exact: true,
			path: `${appConfig.routes.resetPassword}/:key`,
			component: React.lazy(() => import('./ResetPassword')),
			title: 'Reset Password',
		},
	],
};
