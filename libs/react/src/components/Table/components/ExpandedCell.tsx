import React from 'react';

import { IExpandedCellProps } from '../types';
import { ExpandedTableCell } from './';

export const ExpandedCell = ({ children, ...props }: IExpandedCellProps) => (
	<ExpandedTableCell {...props}>
		{ children }
	</ExpandedTableCell>
);
