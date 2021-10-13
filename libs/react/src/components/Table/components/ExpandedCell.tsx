import React from 'react';

import { IExpandedCellProps } from '../types';
import * as S from './Table.styles';

export const ExpandedCell = ({ children, ...props }: IExpandedCellProps) => (
	<S.ExpandedTableCell {...props}>
		{ children }
	</S.ExpandedTableCell>
);
