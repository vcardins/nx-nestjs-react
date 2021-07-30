import React from 'react';
import { ISignedUserOutput, IAppConfig, IRoute } from '@xapp/shared/types';

export interface ILayoutProps {
	id: string;
	config: IAppConfig;
	renderedRoutes: React.ReactElement;
	activeRoute: IRoute;
	userBar?: React.ReactElement;
	sideBar?: React.ReactElement;
	topBar?: React.ReactElement;
	user: ISignedUserOutput;
	onSignOut: () => Promise<void>;
}
