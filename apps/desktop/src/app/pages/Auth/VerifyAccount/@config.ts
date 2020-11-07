import React from 'react';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

export const VerifyAccountPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Auth,
		config: {},
	},
	auth: AuthGroups.onlyGuest,
	routes: [
		{
			key: PageKey.VerifyEmail,
			exact: true,
			path: `${appConfig.routes.verifyAccount}/email`,
			component: React.lazy(() => import('./VerifyEmail')),
			title: 'Verify your account email',
		},
		{
			key: PageKey.VerifyPhone,
			exact: true,
			path: `${appConfig.routes.verifyAccount}/phone`,
			component: React.lazy(() => import('./VerifyPhone')),
			title: 'Verify your account phone number',
		},
	],
};
