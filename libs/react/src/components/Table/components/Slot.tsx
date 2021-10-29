/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled, { css } from 'styled-components';

import { VerticalPositioning, HorizontalPositioning } from '@xapp/shared/types';

interface ITableSlotProps {
	id?: string;
	children?: React.ReactNode;
	position: VerticalPositioning;
	alignment?: HorizontalPositioning;
	borderless?: boolean;
}

const Wrapper = styled.div<Omit<ITableSlotProps, 'children'>>`
	display: flex;
	align-items: center;
	padding: 0.25em 0.5em;
	${({ position, borderless }) => !borderless
		? `border-${position === VerticalPositioning.Top ? VerticalPositioning.Bottom : VerticalPositioning.Top}: 1px solid #eee`
		: undefined};
	${({ alignment = HorizontalPositioning.Center }) => {
		let align = 'center'
		if (alignment === HorizontalPositioning.Left) align = 'flex-start';
		if (alignment === HorizontalPositioning.Right) align = 'flex-end';

		return css `justify-content: ${align}`;
	}}
`;

export const Slot = React.memo(function Slot({ children = null, ...props }: ITableSlotProps) {
	return (
		<Wrapper {...props}>
			{ children }
		</Wrapper>
	);
});
