import React from 'react';

import { ITableCellProps } from '../types';
import { TD } from './StyledComponents';

export const TableCell = (props: ITableCellProps & { left?: number; right?: number }) => {
	const { children, fixed, forwardRef, role = 'td', ...rest } = props;

	return (
		<TD
			ref={forwardRef}
			{...rest}
			role={role}
			data-fixed={fixed}
		>
			{children}
		</TD>
	);
};

TableCell.displayName = 'TableCell';
