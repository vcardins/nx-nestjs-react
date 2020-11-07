import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const ForgotPasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.ForgotPassword,
			exact: true,
			path: appConfig.routes.forgotPassword,
			component: React.lazy(() => import('./ForgotPassword')),
			title: 'Forgot your password? Click here to reset it',
		},
	],
};
