import { RouteConfig } from 'react-router-config';

import { UserGroup } from '@xapp/shared/enums';
import { IPageLayout } from '../interfaces/IPageLayout';
import { IPageMeta } from '../interfaces/IPageMeta';

type IMetaRoute = RouteConfig & IPageMeta;

export interface IRoute extends IMetaRoute {
	auth?: UserGroup[];
	path?: string;
	layout?: IPageLayout;
	action?: () => void;
}

export interface IKeyedRoute extends Record<string, IRoute> {}
