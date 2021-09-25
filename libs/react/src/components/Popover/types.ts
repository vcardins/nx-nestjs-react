import { ReactNode, ReactElement } from 'react';

export interface IDropdownWrapper {
	arrowPosition?: number;
	children?: ReactNode;
	position?: string;
}

export interface IPopoverProps extends IDropdownWrapper {
	children?: ReactNode;
	content?: ReactElement;
}
