import React from 'react';
import styled from 'styled-components';

import { TextAlignment } from '@xapp/shared/types';
import { ITableCellProps } from '../types';

export const StyledTableCell = styled.div<{ align: TextAlignment }>`
	display: flex;
	align-items: ${({ align }) => align};
	justify-content: ${({ align }) => align};
`;

export const TableCellLabel = styled.div``;

export const TableCell = (props: ITableCellProps) => {
	const { children, align, fixedLeft, fixedRight } = props;

	return (
		<StyledTableCell
			role="tablecell"
			align={align}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</StyledTableCell>
	);
};
