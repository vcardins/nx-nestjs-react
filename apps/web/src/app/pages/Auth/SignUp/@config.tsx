import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import SignUp from './SignUp';
// const element = React.lazy(() => import('./SignUp'));

export const SignUpPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.Guest,
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
