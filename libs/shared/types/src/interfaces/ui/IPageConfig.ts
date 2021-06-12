import { UserRole } from '@xapp/shared/types';
import { IRoute } from './IRoute';
import { IPageLayout } from './IPageLayout';

export interface IPageConfig {
	auth?: UserRole[];
	routes: IRoute[];
	layout: IPageLayout;
}
