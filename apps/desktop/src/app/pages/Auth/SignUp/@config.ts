import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const SignUpPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.SignUp,
			exact: true,
			path: appConfig.routes.signUp,
			component: React.lazy(() => import('./SignUp')),
			title: 'Don\'t have an account? SignUp here',
		},
	],
};
