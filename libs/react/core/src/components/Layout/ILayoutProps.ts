import React from 'react';
import { IAppConfig, ISignedUserOutput } from '@xapp/shared/interfaces';
import { IRoute } from '../../interfaces/IRoute';

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
