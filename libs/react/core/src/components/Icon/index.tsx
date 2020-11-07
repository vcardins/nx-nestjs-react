import React from 'react';
import styled from 'styled-components';

const I = styled.i.attrs({ className: 'icon material-icons'})<{ size: number}>`
	width: 12px;
	${({size}) => size && `font-size: ${size}px!important`};
`;

// type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
interface Props {
	id?: string;
	as?: any;
	/** Formatted to appear bordered */
	bordered?: boolean;
	/** Icon can formatted to appear circular. */
	circular?: boolean;
	/** Icon name. */
	name: string;
	/** Icon title. */
	title?: string;
	/** Color of the icon. */
	color?: string;
	/** Size in pixels. */
	size?: number;
}

function Icon ({id, name, size, title}: Props) {
	return (
		<I id={id} title={title} size={size}>
			{name}
		</I>
	);
}

export { Icon };
