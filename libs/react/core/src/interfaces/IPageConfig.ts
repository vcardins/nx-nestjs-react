import { UserGroup } from '@xapp/shared/enums';
import { IRoute } from '../interfaces/IRoute';
import { IPageLayout } from '../interfaces/IPageLayout';

export interface IPageConfig {
	auth?: UserGroup[];
	routes: IRoute[];
	layout: IPageLayout;
}
