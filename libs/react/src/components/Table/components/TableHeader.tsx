import React, { useState } from 'react';
import styled from 'styled-components';

import { SortDirections } from '@xapp/shared/types';
import { ITableHeader } from '../types';

export const TableHeaderWrapper = styled.div<{ sortable: boolean }>``;

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

export const TableHeader = (props: ITableHeader) => {
	const { index, name, label, sortDirection, forwardRef, fixedLeft, fixedRight, tableHeight, isLast, isResizing, onResize, onSort } = props;
	const [sortOrder, setSortOrder] = useState<SortDirections>(sortDirection || SortDirections.NONE);

	const handleSort = () => {
		let updatedSortOrder: SortDirections;
		if (sortOrder === SortDirections.NONE) {
			updatedSortOrder = SortDirections.ASC;
		}
		else {
			updatedSortOrder = sortOrder === SortDirections.ASC
				? SortDirections.DESC
				: SortDirections.NONE;
		}
		onSort(index, updatedSortOrder);
		setSortOrder(updatedSortOrder);
	};

	const classNames = [
		(fixedLeft || fixedRight) && 'cell-header-pinned',
		sortDirection !== SortDirections.NONE && 'cell-header-sortable',
	].filter(Boolean).join(' ');

	return (
		<TableHeaderWrapper
			role="column-header"
			ref={forwardRef}
			sortable={sortOrder !== SortDirections.NONE}
			className={classNames}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedLeft}
			data-name={name}
			data-sortable={sortDirection}
		>
			<Title role="column-label">{label}</Title>
			<Sorter role="column-sorter" onClick={handleSort}>
				{sortOrder === SortDirections.NONE ? '' : 'o'}
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
		</TableHeaderWrapper>
	);
};
