import { UserRoles } from '@xapp/shared/types';
import { IRoute } from './IRoute';
import { IPageLayout } from './IPageLayout';

export interface IPageConfig {
	auth?: UserRoles[];
	routes: IRoute[];
	layout: IPageLayout;
}
