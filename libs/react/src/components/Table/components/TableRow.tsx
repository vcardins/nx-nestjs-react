import React from 'react';

import { ITableRowProps } from '../types';
import { TableRow, Actions } from './StyledComponents';

export const TR = (props: ITableRowProps) => {
	const { children, id, bg, actions, columnsWidths: gridTemplateColumns } = props;

	return (
		<TableRow
			id={id}
			role="tr"
			bg={bg}
			style={{ gridTemplateColumns }}
		>
			{ children }
			<Actions>
				{ actions }
			</Actions>
		</TableRow>
	);
};
