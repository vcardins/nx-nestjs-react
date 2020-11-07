export interface IMenuItem {
	id: string;
	href?: string;
	onClick?: Function;
	label: string;
	icon?: string;
	children?: IMenuItem[];
	order?: number;
}
