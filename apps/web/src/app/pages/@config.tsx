import React from 'react';
import { Navigate } from 'react-router-dom';

import { IPageConfig, AuthGroups, LayoutStyles, PageKey } from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';


import { AdminPageConfig } from './Admin/@config';
import { DashboardPageConfig } from './Dashboard/@config';
import { StatePageConfig } from './State/@config';
import { Error404PageConfig } from './Errors/404/@config';
import { Error500PageConfig } from './Errors/500/@config';
import { TodoPageConfig } from './Todo/@config';

import { authPagesConfigs } from './Auth/@config';

const RedirectHome = <Navigate to={appConfig.routes.home} />;
const RedirectNotFound = <Navigate to={appConfig.routes.notFound} />;

const DefaultPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
	},
	auth: AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Home,
			caseSensitive: true,
			title: 'Home Page',
			path: appConfig.routes.home,
			element: () => RedirectHome,
		},
		{
			key: PageKey.PageNotFound,
			caseSensitive: true,
			title: 'Not Found',
			element: () => RedirectNotFound,
		},
	],
};

export const pagesConfigs = [
	...authPagesConfigs,
	DashboardPageConfig,
	StatePageConfig,
	AdminPageConfig,
	Error404PageConfig,
	Error500PageConfig,
	TodoPageConfig,
	DefaultPageConfig,
];
