import React from 'react';

import { AuthGroups, IPageConfig, LayoutStyles, PageKey } from '@xapp/shared/types';

import Task from './Task';
import TaskTemplate from './TaskTemplate';
// const element = React.lazy(() => import('./Task'));

export const TaskPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	routes: [
		{
			key: PageKey.Task,
			caseSensitive: true,
			auth: AuthGroups.User,
			path: '/tasks',
			element: <Task />,
			title: 'Task',
		},
		{
			key: PageKey.TaskTemplate,
			caseSensitive: true,
			auth: AuthGroups.Admin,
			path: '/task-templates',
			element: <TaskTemplate />,
			title: 'Task Template',
		},
	],
};
