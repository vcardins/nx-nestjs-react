import { RouteObject } from 'react-router';

import { UserGroup } from '@xapp/shared/auth';
import { IPageLayout } from '../interfaces/IPageLayout';
import { IPageMeta } from '../interfaces/IPageMeta';

type IMetaRoute = RouteObject & IPageMeta;

export interface IRoute extends Omit<IMetaRoute, 'path'> {
	auth?: UserGroup[];
	path?: string;
	layout?: IPageLayout;
	action?: () => void;
}

export interface IKeyedRoute extends Record<string, IRoute> {}
