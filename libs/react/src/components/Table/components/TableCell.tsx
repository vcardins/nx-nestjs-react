import React from 'react';

import { ITableCellProps } from '../types';

export const TableCell = (props: ITableCellProps) => {
	const { children, fixedLeft, fixedRight } = props;

	return (
		<div
			role="tablecell"
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</div>
	);
};
