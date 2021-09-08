import React, { useState } from 'react';
import styled from 'styled-components';

import { SortDirections, TextAlignment } from '@xapp/shared/types';
import { ITableHeader } from '../types';
export const TableHeaderWrapper = styled.div<{ sortable: boolean; align: TextAlignment }>`
	display: flex;
	align-items: ${({ align }) => align};
	justify-content: ${({ align }) => align};
`;

export const Title = styled.span`
	display: flex;
`;

export const Sorter = styled.span`
	display: flex;
`;

export const Resizer = styled.div<{ active?: boolean; height: number | 'auto' }>`
	display: block;
	position: absolute;
	cursor: col-resize;
	width: 7px;
	right: 0;
	top: 0;
	z-index: 1;
	border-right: 2px solid transparent;
	height: ${({ height }) => height}px;

	&:hover {
		border-color: #ccc;
	}

	${({ active }) => active && 'border-color: #517ea5;'};
`;

export const TableHeader = (props: ITableHeader & { align?: TextAlignment }) => {
	const { index, name, align, children, sortDirection, forwardRef, fixedLeft, fixedRight, tableHeight, isLast, isResizing, onResize, onSort } = props;
	const [sortOrder, setSortOrder] = useState<SortDirections | null>(sortDirection || null);

	const handleSort = () => {
		let updatedSortOrder: SortDirections;
		if (sortOrder === null) {
			updatedSortOrder = SortDirections.ASC;
		}
		else {
			updatedSortOrder = sortOrder === SortDirections.ASC
				? SortDirections.DESC
				: null;
		}
		onSort(index, updatedSortOrder);
		setSortOrder(updatedSortOrder);
	};

	const classNames = [
		(fixedLeft || fixedRight) && 'cell-header-pinned',
		sortDirection !== null && 'cell-header-sortable',
	].filter(Boolean).join(' ');
	const content = React.isValidElement(children)
		? children
		: (
			<>
				<Title role="column-children">{children}</Title>
				<Sorter role="column-sorter" onClick={handleSort}>
				{sortOrder === null ? '' : 'o'}
					{sortOrder === SortDirections.ASC ? '▲' : ''}
					{sortOrder === SortDirections.DESC ? '▼' : ''}
				</Sorter>
				{!isLast && (
					<Resizer
						role="column-sorter"
						height={tableHeight}
						onMouseDown={() => onResize(index)}
						active={isResizing}
					/>
				)}
			</>
		);

	return (
		<TableHeaderWrapper
			role="column-header"
			ref={forwardRef}
			sortable={sortOrder !== null}
			className={classNames}
			align={align || TextAlignment.Left}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedLeft}
			data-name={name}
			data-sortable={sortDirection}
		>
			{ content }
		</TableHeaderWrapper>
	);
};
