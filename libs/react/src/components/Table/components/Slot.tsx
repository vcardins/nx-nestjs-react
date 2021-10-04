/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';

interface ITableSlotProps {
	children?: React.ReactNode;
	position: 'top' | 'bottom';
	borderless?: boolean;
}

const Wrapper = styled.div<Omit<ITableSlotProps, 'children'>>`
	display: flex;
	align-items: center;
	padding: 0.25em 0.5em;
	${({ position, borderless }) => !borderless
		? `border-${position === 'top' ? 'bottom' : 'top'}: 1px solid #eee`
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
