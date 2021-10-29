import { IBadge } from './IBadge';
import { IRoute } from './IRoute';
import { DropdownItemTypes } from '../../enums/ui';

export interface IListItem {
	key?: string;
	type?: DropdownItemTypes;
	label?: string;
	disabled?: boolean;
	value?: string | number;
	icon?: string;
	auth?: string[];
	badge?: IBadge;
	route?: IRoute;
	href?: string;
	onClick?: () => void;
	target?: string;
	children?: IListItem[];
	order?: number;
	hide?: boolean;
	iconOnly?: boolean;
}
