import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import SignIn from './SignIn';
// const element = React.lazy(() => import('./SignIn'));

export const SignInPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.SignIn,
			caseSensitive: true,
			path: appConfig.routes.signIn,
			title: 'Already have an account? Sign in!',
			element: <SignIn />,
			children: [
				{
					caseSensitive: true,
					path: ':provider?/:code',
					element: <SignIn />,
				},
			],
		},
		// {
		// 	key: `${PageKey.SignIn}Provider`,
		// 	caseSensitive: true,
		// 	path: `${appConfig.routes.signIn}/:provider/callback`,
		// 	title: 'Already have an account? Sign in!',
		// 	element: React.lazy(() => import('./SignInOauth')),
		// },
	],
};
