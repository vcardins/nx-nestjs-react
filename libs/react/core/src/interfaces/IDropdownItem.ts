import { IBadge } from './IBadge';
import { IRoute } from './IRoute';
import { DropdownItemTypes } from '../enums/DropdownItemTypes';

export interface IDropdownItem {
	id?: string;
	type?: DropdownItemTypes;
	title?: string;
	icon?: string;
	auth?: string[];
	badge?: IBadge;
	route?: IRoute;
	href?: string;
	onClick?: () => void;
	target?: string;
	children?: IDropdownItem[];
	order?: number;
	hide?: boolean;
	iconOnly?: boolean;
}
