import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/auth';

import SignUp from './SignUp';
// const element = React.lazy(() => import('./SignUp'));

export const SignUpPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.SignUp,
			caseSensitive: true,
			path: appConfig.routes.signUp,
			element: <SignUp />,
			title: "Don't have an account? SignUp here",
		},
	],
};
