import React from 'react';

import { IListItem } from '@xapp/shared/types';
import { IPopoverProps } from '../Popover/types';

export enum DropdownSizeStyle {
	Small = 'small',
	Default = 'default',
}

export interface IDropdownListProps extends Omit<IPopoverProps, 'children'> {
	emptyValueLabel?: string;
	selectedItem?: string;
	options: IListItem[];
	disabled?: boolean;
	size?: DropdownSizeStyle;
	closeOnSelect?: boolean;
	children?: React.ReactElement;
}
