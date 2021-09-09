import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { SortDirections } from '@xapp/shared/types';
import { DownArrow, UpArrow, UpAndDownArrows } from './';

import { ITableHeader } from '../types';
import { ActionLink } from './ActionLink';

export const TableHeaderWrapper = styled.div``;

export const Sorter = styled.span`
	display: flex;
	align-items: center;
	padding: 0.25em 2px;
`;

export const Resizer = styled.div<{ active?: boolean; height: number | 'auto' }>`
	display: block;
	position: absolute;
	cursor: col-resize;
	width: 5px;
	right: 0;
	top: 0;
	z-index: 2;
	border-right: 2px solid transparent;
	height: ${({ height }) => height}px;

	&:hover {
		border-color: #ccc;
	}

	${({ active }) => active && css`border-color: #517ea5;`};
`;

export const TableHeader = (props: ITableHeader & { isControl?: boolean }) => {
	const {
		index,
		name,
		children,
		isControl,
		sortDirection,
		forwardRef,
		fixedLeft,
		fixedRight,
		tableHeight,
		resizable = true,
		isResizing,
		onResize,
		onSort,
	} = props;

	const content = useMemo(() => {
		if (isControl || !onSort) {
			return children;
		}

		let icon = null;
		switch (sortDirection) {
			case SortDirections.ASC: icon = <UpArrow />; break;
			case SortDirections.DESC: icon = <DownArrow />; break;
			default: icon = <UpAndDownArrows color="#ccc" size="6px"/>;
		}

		return (
			<>
				<ActionLink onClick={onSort}>
					{children}
					<Sorter>{icon}</Sorter>
				</ActionLink>
				{resizable && (
					<Resizer
						height={tableHeight}
						onMouseDown={() => onResize(index)}
						active={isResizing}
					/>
				)}
			</>
		);
	}, [children, tableHeight, index, isResizing, sortDirection, resizable, onSort]);

	return (
		<TableHeaderWrapper
			role="column-header"
			ref={forwardRef}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
			data-name={name}
		>
			{content}
		</TableHeaderWrapper>
	);
};
