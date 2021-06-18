import { IBadge } from './IBadge';
import { IRoute } from './IRoute';
import { NavItemTypes } from '../../enums/ui';

export interface INavItem {
	id?: string;
	type?: NavItemTypes;
	label?: string;
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

export interface ISubNavItem extends Omit<INavItem, 'children'> {
	children?: INavItem;
}
