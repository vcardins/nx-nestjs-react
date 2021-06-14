import React from 'react';

import { IPageConfig, AuthRoles, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import VerifyEmail from './VerifyEmail';
// const element = React.lazy(() => import('./VerifyEmail'));

export const VerifyAccountPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthRoles.onlyGuest,
	routes: [
		{
			key: PageKey.VerifyEmail,
			caseSensitive: true,
			path: `${appConfig.routes.verifyAccount}/email`,
			element: <VerifyEmail />,
			title: 'Verify your account email',
		},
		{
			key: PageKey.VerifyPhone,
			caseSensitive: true,
			path: `${appConfig.routes.verifyAccount}/phone`,
			element: React.lazy(() => import('./VerifyPhone')),
			title: 'Verify your account phone number',
		},
	],
};
