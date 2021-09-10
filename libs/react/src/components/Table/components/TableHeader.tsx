import React, { useMemo } from 'react';

import { SortDirections } from '@xapp/shared/types';
import { DownArrow, UpArrow, UpAndDownArrows, TableHeaderWrapper, Sorter, Resizer } from './';

import { ITableHeader } from '../types';
import { ActionLink } from './ActionLink';


export const TableHeader = (props: ITableHeader & { isControl?: boolean }) => {
	const {
		index,
		children,
		isControl,
		sortDirection,
		forwardRef,
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
		>
			{content}
		</TableHeaderWrapper>
	);
};
