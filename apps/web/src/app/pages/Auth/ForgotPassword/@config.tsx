import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import ForgotPassword from './ForgotPassword';
// const element = React.lazy(() => import('./ForgotPassword'));

export const ForgotPasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.Guest,
	routes: [
		{
			key: PageKey.ForgotPassword,
			caseSensitive: true,
			path: appConfig.routes.forgotPassword,
			element: <ForgotPassword />,
			title: 'Forgot your password? Click here to reset it',
		},
	],
};
