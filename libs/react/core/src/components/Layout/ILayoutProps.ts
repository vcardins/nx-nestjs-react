import React from 'react';
import { ISignedUserOutput } from '@xapp/shared/auth';
import { IAppConfig } from '@xapp/shared/config';
import { IRoute } from '@xapp/shared/types';

export interface ILayoutProps {
	id: string;
	config: IAppConfig;
	renderedRoutes: React.ReactElement;
	activeRoute: IRoute;
	userMenu?: React.ReactElement;
	sideMenu?: React.ReactElement;
	user: ISignedUserOutput;
	onSignOut: () => Promise<void>;
}
