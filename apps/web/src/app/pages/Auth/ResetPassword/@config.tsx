import React from 'react';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import ResetPassword from './ResetPassword';
// const element = React.lazy(() => import('./ResetPassword'));

export const ResetPasswordPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthGroups.user,
	routes: [
		{
			key: PageKey.ResetPassword,
			caseSensitive: true,
			path: `${appConfig.routes.resetPassword}/:key`,
			element: <ResetPassword />,
			title: 'Reset Password',
		},
	],
};
