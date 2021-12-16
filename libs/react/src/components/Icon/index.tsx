import React from 'react';
import styled from 'styled-components';
import IconKit, { IconProp } from 'react-icons-kit';

interface IExtendedIconProps extends IconProp {
	id?: string;
	title?: string;
	inverse?: boolean | number; // It was defined as number to avoid the react warning: Warning: Received `false` for a non-boolean attribute.
}

const ExtendedIcon = styled(IconKit)<IExtendedIconProps>`
	line-height: 0;
	${({ size }) => size && `font-size: ${size}px!important`};
`;

export const Icon = (props: IExtendedIconProps) => (
	<ExtendedIcon
		{...props}
	/>
);
