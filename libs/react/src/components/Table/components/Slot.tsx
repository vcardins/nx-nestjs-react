/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';

import { Positioning } from '@xapp/shared/types';

interface ITableSlotProps {
	children?: React.ReactNode;
	position: Positioning;
	borderless?: boolean;
}

const Wrapper = styled.div<Omit<ITableSlotProps, 'children'>>`
	display: flex;
	align-items: center;
	padding: 0.25em 0.5em;
	${({ position, borderless }) => !borderless
		? `border-${position === Positioning.Top ? Positioning.Bottom : Positioning.Top}: 1px solid #eee`
		: undefined
};
`;

export const Slot = React.memo(function Slot({ position, borderless, children = null }: ITableSlotProps) {
	return (
		<Wrapper position={position} borderless={borderless}>
			{ children }
		</Wrapper>
	);
});
