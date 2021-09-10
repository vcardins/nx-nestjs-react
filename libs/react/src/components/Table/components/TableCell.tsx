import React from 'react';

import { ITableCellProps } from '../types';

export const TableCell = (props: ITableCellProps) => {
	const { children, fixedLeft, fixedRight, forwardRef, role = 'td' } = props;

	return (
		<div
			ref={forwardRef}
			role={role}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</div>
	);
};
