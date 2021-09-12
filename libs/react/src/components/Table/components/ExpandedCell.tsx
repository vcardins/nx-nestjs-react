import React from 'react';

import { IExpandedCellProps } from '../types';
import { ExpandedTableCell, TableCellContent } from './';

export const ExpandedCell = ({ children, align, bg, borderColor }: IExpandedCellProps) => (
	<ExpandedTableCell align={align} bg={bg} borderColor={borderColor}>
		<TableCellContent>
			{ children }
		</TableCellContent>
	</ExpandedTableCell>
);
