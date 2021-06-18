import React from 'react';

import { AuthRoles, IPageConfig, LayoutStyles, PageKey } from '@xapp/shared/types';

import Task from './Task';
import TaskTemplate from './TaskTemplate';
// const element = React.lazy(() => import('./Task'));

export const TaskPageConfig: IPageConfig = {
	layout: {
		style: LayoutStyles.Viewport,
		config: {},
	},
	auth: AuthRoles.user,
	routes: [
		{
			key: PageKey.Task,
			caseSensitive: true,
			path: '/tasks',
			element: <Task />,
			title: 'Task',
		},
		{
			key: PageKey.TaskTemplate,
			caseSensitive: true,
			path: '/task-templates',
			element: <TaskTemplate />,
			title: 'Task Template',
		},
	],
};
