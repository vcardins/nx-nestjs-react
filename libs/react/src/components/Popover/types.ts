import { ReactNode, CSSProperties } from 'react';

import { Positioning } from '@xapp/shared/types';

export interface IPopoverContainer {
	isOpen?: boolean;
	padded?: boolean;
	position?: Positioning;
	width?: CSSProperties['width'];
	height?: CSSProperties['height'];
}

export interface IChevron {
	hideChevron?: boolean;
}

export interface IPopoverProps extends IChevron, Omit<IPopoverContainer, 'active'> {
	trigger?: ReactNode;
	title?: string;
	children?: ReactNode | ((onClose: () => void) => ReactNode);
	footer?: ReactNode;
}
