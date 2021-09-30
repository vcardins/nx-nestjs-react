import { CSSProperties } from 'react';

export enum HorizontalPosition {
	Left = 'left',
	Center = 'center',
	Right = 'right',
}

export interface IDropdownContainer {
	position?: HorizontalPosition;
	active?: boolean;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
}

export interface IChevron {
	hideChevron?: boolean;
}

export interface IDropdownProps extends IChevron {
	trigger?: React.ReactElement;
	title?: string;
	children?: React.ReactElement;
	footer?: React.ReactElement;
	hideChevron?: boolean;
	position?: HorizontalPosition;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
}

export interface IDropdownItem {
	id?: string;
	value?: string | number;
	label: string;
	disabled?: boolean;
}

export interface IDropdownListProps {
	columns?: number;
	showCheckbox?: boolean;
	selectedItems: IDropdownItem['value'][];
	options?: IDropdownItem[];
	onSelect: (value: IDropdownItem['value'], checked: boolean) => void;
}
