import React from 'react';
import styled from 'styled-components';
import IconKit, { IconProp } from 'react-icons-kit';

interface IExtendedIconProps extends IconProp {
	id?: string;
	title?: string;
	inverse?: boolean;
}

const ExtendedIcon = styled(IconKit)<IExtendedIconProps>`
	/* width: 12px;
	${({size}) => size && `font-size: ${size}px!important`}; */
`;

// type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
// interface Props {
// 	id?: string;
// 	as?: any;
// 	/** Formatted to appear bordered */
// 	bordered?: boolean;
// 	/** Icon can formatted to appear circular. */
// 	circular?: boolean;
// 	/** Icon name. */
// 	name: string;
// 	/** Icon title. */
// 	title?: string;
// 	/** Color of the icon. */
// 	color?: string;
// 	/** Size in pixels. */
// 	size?: number;
// }

export const Icon = (props: IExtendedIconProps) => (
	<ExtendedIcon
		{...props}
	/>
);
