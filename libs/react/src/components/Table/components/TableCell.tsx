import React from 'react';

import { ITableCellProps } from '../types';

export const TableCell = (props: ITableCellProps) => {
	const { children, fixedLeft, fixedRight, role = 'tablecell' } = props;

	return (
		<div
			role={role}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</div>
	);
};
