import React from 'react';
import { Navigate } from 'react-router-dom';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

import { AdminPageConfig } from './Admin/@config';
import { DashboardPageConfig } from './Dashboard/@config';
import { Error404PageConfig } from './Errors/404/@config';
import { Error500PageConfig } from './Errors/500/@config';
import { TodoPageConfig } from './Todo/@config';

import { authPagesConfigs } from './Auth/@config';

const RedirectHome = <Navigate to={appConfig.routes.home}/>;
const RedirectNotFound = <Navigate to={appConfig.routes.notFound}/>;

const DefaultPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
	},
	auth    : AuthGroups.everyone,
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
	AdminPageConfig,
	Error404PageConfig,
	Error500PageConfig,
	TodoPageConfig,
	DefaultPageConfig,
];
