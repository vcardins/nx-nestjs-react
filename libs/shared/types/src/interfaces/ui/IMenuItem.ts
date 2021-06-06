export interface IMenuItem {
	id: string;
	href?: string;
	onClick?: (e: MouseEvent) => any;
	label: string;
	icon?: string;
	children?: IMenuItem[];
	order?: number;
}
