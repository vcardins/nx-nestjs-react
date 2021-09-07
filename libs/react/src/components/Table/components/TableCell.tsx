import React from 'react';
import styled from 'styled-components';

import { TextAlignment } from '@xapp/shared/types';

export interface ITableCellProps {
	row: number;
	column: number;
	align?: TextAlignment;
	fixedLeft?: boolean;
	fixedRight?: boolean;
	children?: React.ReactNode;
}

export const StyledTableCell = styled.div``;

export const TableCellLabel = styled.div``;

export const TableCell = (props: ITableCellProps) => {
	const { children, row, fixedLeft, fixedRight } = props;

	return (
		<StyledTableCell
			role="tablecell"
			data-tag={row % 2 === 0 ? 'even' : 'odd'}
			data-fixed-left={fixedLeft}
			data-fixed-right={fixedRight}
		>
			{children}
		</StyledTableCell>
	);
};
