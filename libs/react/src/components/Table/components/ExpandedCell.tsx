import React from 'react';

import { IExpandedCellProps } from '../types';
import { ExpandedTableCell, TableCellContent } from './';

export const ExpandedCell = ({ children, align, bg }: IExpandedCellProps) => (
	<ExpandedTableCell align={align} bg={bg}>
		<TableCellContent>
			{ children }
		</TableCellContent>
	</ExpandedTableCell>
);
