import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/auth';

import ForgotPassword from './ForgotPassword';
// const element = React.lazy(() => import('./ForgotPassword'));

export const ForgotPasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
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
