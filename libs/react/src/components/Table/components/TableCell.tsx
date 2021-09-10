import React from 'react';

import { ITableCellProps } from '../types';

export const TableCell = (props: ITableCellProps) => {
	const { id, children, fixedLeft, fixedRight, forwardRef, order, role = 'td' } = props;

	return (
		<div
			id={id}
			ref={forwardRef}
			role={role}
			data-order={order}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</div>
	);
};
