import React from 'react';
import styled, { css } from 'styled-components';

import { IIconProps } from '../types';
import { ReactComponent as ArrowDown } from '../svg/angle-bottom.svg';
import { ReactComponent as ArrowUp } from '../svg/angle-top.svg';
import { ReactComponent as LoaderIcon } from '../svg/loader.svg';
import { ReactComponent as TableIcon } from '../svg/table.svg';
import { ReactComponent as FilterIcon } from '../svg/filter-line.svg';

const IconWrapper = styled.span<IIconProps>`
	line-height: 0;
	${({ color = '#444', size = '8px' }) => css`
		svg {
			fill: ${color};
			width: ${size};
			height: ${size};
		}
	`}
`;

export const Columns = (props: IIconProps) => (
	<IconWrapper {...props} size="12px">
		<TableIcon />
	</IconWrapper>
);

export const Filters = (props: IIconProps) => (
	<IconWrapper {...props} size="12px">
		<FilterIcon />
	</IconWrapper>
);

export const Arrows = ({ direction, ...props }: IIconProps & { direction: 'up' | 'down'}) => (
	<IconWrapper {...props}>
		{ direction === 'up' ? <ArrowUp /> : <ArrowDown /> }
	</IconWrapper>
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

const LoaderWrapper = styled(IconWrapper)<{ speed?: number }>`
	[role="spinner"] {
		animation: spinner ${({ speed = 2 }) => `${speed}s`} infinite linear;
		transform: translateZ(0);
	}

	@keyframes spinner{
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;

export const Loader = (props: IIconProps) => (
	<LoaderWrapper {...props}>
		<LoaderIcon role="spinner"/>
	</LoaderWrapper>
);
