import React from 'react';

import { ITableCellProps } from '../types';
import * as S from './Table.styles';

export const TableCell = (props: ITableCellProps & { left?: number; right?: number }) => {
	const { children, fixed, forwardRef, role = 'td', ...rest } = props;

	return (
		<S.TD
			ref={forwardRef}
			{...rest}
			role={role}
			data-fixed={fixed}
		>
			{children}
		</S.TD>
	);
};

TableCell.displayName = 'TableCell';
