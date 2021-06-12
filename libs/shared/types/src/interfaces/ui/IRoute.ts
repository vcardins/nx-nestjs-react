import { RouteObject } from 'react-router';

import { UserRole } from '@xapp/shared/types';
import { IPageLayout } from './IPageLayout';
import { IPageMeta } from './IPageMeta';

type IMetaRoute = RouteObject & IPageMeta;

export interface IRoute extends Omit<IMetaRoute, 'path'> {
	auth?: UserRole[];
	path?: string;
	layout?: IPageLayout;
	action?: () => void;
}

export interface IKeyedRoute extends Record<string, IRoute> {}
