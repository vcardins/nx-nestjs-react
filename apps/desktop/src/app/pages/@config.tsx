import React from 'react';
import { Redirect } from 'react-router-dom';

import { IPageConfig, LayoutStyles, PageKey } from '@xapp/react/core';
import { appConfig } from '@xapp/shared/config';
import { AuthGroups } from '@xapp/shared/enums';

import { AdminPageConfig } from './Admin/@config';
import { DashboardPageConfig } from './Dashboard/@config';
import { Error404PageConfig } from './Errors/404/@config';
import { Error500PageConfig } from './Errors/500/@config';
import { TodoPageConfig } from './Todo/@config';

import { authPagesConfigs } from './Auth/@config';

const DefaultPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Clean,
	},
	auth    : AuthGroups.everyone,
	routes: [
		{
			key: PageKey.Home,
			exact: true,
			title: 'Home Page',
			path: appConfig.routes.home,
			component: () => <Redirect to={appConfig.routes.home}/>,
		},
		{
			key: PageKey.PageNotFound,
			exact: true,
			title: 'Not Found',
			component: () => <Redirect to={appConfig.routes.notFound}/>,
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
