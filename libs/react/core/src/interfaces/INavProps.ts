import { MouseEventHandler } from 'react';
import { INavItem } from './INavItem';
export interface INavProps {
	className?: string;
	item?: INavItem;
	layout?: string;
	active?: boolean;
	dense?: boolean;
	nestedLevel?: number;
	userRole?: string;
	location?: Location;
	navbarCloseMobile?: MouseEventHandler<HTMLInputElement>;
}
