import React, { useMemo } from 'react';

import { SortDirections } from '@xapp/shared/types';

import { IColumnHeader } from '../types';
import { DownArrow, UpArrow, UpAndDownArrows, Sorter, Resizer, ActionLink, TableCell } from './';

export const ColumnHeader = (props: IColumnHeader & { isControl?: boolean; left?: number; right?: number }) => {
	const {
		id, index, children, isControl, sortDirection, forwardRef, tableHeight,
		fixed, left, right, resizable = true, isResizing, onResize, onSort,
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
		<TableCell
			id={id}
			role="th"
			forwardRef={forwardRef}
			left={left}
			right={right}
			fixed={fixed}
		>
			{content}
		</TableCell>
	);
};
