import React from 'react';
import styled, { css } from 'styled-components';

import { IIconProps } from '../types';
import { ReactComponent as ArrowDown } from './svg/angle-bottom.svg';
import { ReactComponent as ArrowUp } from './svg/angle-top.svg';

const ArrowsWrapper = styled.span<IIconProps>`
	line-height: 0;
	${({ color = '#444', size = '8px' }) => css`
		svg {
			fill: ${color};
			width: ${size};
			height: ${size};
		}
	`}
`;

export const Arrows = ({ direction, ...props }: IIconProps & { direction: 'up' | 'down'}) => (
	<ArrowsWrapper {...props}>
		{ direction === 'up' ? <ArrowUp /> : <ArrowDown /> }
	</ArrowsWrapper>
);

export const DownArrow = (props: IIconProps) => <Arrows {...props} direction="down" />;
export const UpArrow = (props: IIconProps) => <Arrows {...props} direction="up" />;

const UpDownWrapper = styled.span`
	display: flex;
	flex-direction: column;
`;

export const UpAndDownArrows = (props: IIconProps) => (
	<UpDownWrapper>
		<UpArrow  {...props} />
		<DownArrow  {...props} />
	</UpDownWrapper>
);
