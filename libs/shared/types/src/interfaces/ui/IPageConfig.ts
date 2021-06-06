import { UserGroup } from '@xapp/shared/types';
import { IRoute } from './IRoute';
import { IPageLayout } from './IPageLayout';

export interface IPageConfig {
	auth?: UserGroup[];
	routes: IRoute[];
	layout: IPageLayout;
}
