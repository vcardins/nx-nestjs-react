import React from 'react';

import { IDropdownItem } from '@xapp/shared/types';

export enum DropdownSizeStyle {
	Small = 'small',
	Default = 'default',
}

export interface IDropdownProps {
	trigger?: React.ReactElement;
	children?: (onClose: () => void) => React.ReactElement;
	size?: DropdownSizeStyle;
	label?: string;
	hideChevron?: boolean;
	position?: 'right' | 'left';
	highlightOnHover?: boolean;
}

export interface IDropdownListProps extends Omit<IDropdownProps, 'children'> {
	emptyValueLabel?: string;
	selectedItem?: string;
	options: IDropdownItem[];
	disabled?: boolean;
	size?: DropdownSizeStyle;
	closeOnSelect?: boolean;
	children?: React.ReactElement;
}
