export interface IMenuItem {
	id: string;
	href?: string;
	onClick?: (e: MouseEvent) => void;
	label: string;
	icon?: string;
	children?: IMenuItem[];
	order?: number;
}
