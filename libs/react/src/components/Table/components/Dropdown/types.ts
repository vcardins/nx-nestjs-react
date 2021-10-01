import React, { CSSProperties } from 'react';

export enum HorizontalPosition {
	Left = 'left',
	Center = 'center',
	Right = 'right',
}

export interface IDropdownContainer {
	active?: boolean;
	padded?: boolean;
	position?: HorizontalPosition;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
}

export interface IChevron {
	hideChevron?: boolean;
}

export interface IDropdownProps extends IChevron, Omit<IDropdownContainer, 'active'> {
	trigger?: React.ReactNode;
	title?: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
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
