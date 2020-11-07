import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const SignInPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.SignIn,
			exact: true,
			path: `${appConfig.routes.signIn}/:provider?/:code?`,
			title: 'Already have an account? Sign in!',
			component: React.lazy(() => import('./SignIn')),
		},
		// {
		// 	key: `${PageKey.SignIn}Provider`,
		// 	exact: true,
		// 	path: `${appConfig.routes.signIn}/:provider/callback`,
		// 	title: 'Already have an account? Sign in!',
		// 	component: React.lazy(() => import('./SignInOauth')),
		// },
	],
};
