import { IRoute } from './IRoute';
import { IPageLayout } from './IPageLayout';
import { UserRoles } from '../../enums';

export interface IPageConfig {
	auth?: UserRoles[];
	routes: IRoute[];
	layout: IPageLayout;
}
