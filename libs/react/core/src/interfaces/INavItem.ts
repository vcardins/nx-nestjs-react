import { IBadge } from './IBadge';
import { IRoute } from './IRoute';
import { NavItemTypes } from '../enums/NavItemTypes';

export interface INavItem {
	id?: string;
	type?: NavItemTypes;
	title?: string;
	icon?: string;
	auth?: string[];
	badge?: IBadge;
	route?: IRoute;
	isHidden?: boolean;
	onClick?: () => void;
	target?: string;
	children?: INavItem[];
	order?: number;
}
