import React from 'react';

import { DataFormats, Positioning } from '@xapp/shared/types';
import { TD } from '.';
import { ITableRowProps } from '../types';
import { TableRow, Actions, TableCellContent } from './StyledComponents';
import { useRenderer as renderers } from '../hooks';

function Row <T = any>(props: ITableRowProps<T>) {
	let children: React.ReactNode;
	let align: Positioning;
	let fixed: Positioning;
	let cellId: string;

	const {
		id, index, bg, item, idProp, columns, customRenderers,
		checkedItems, onCheckItems, expandedItems, onExpandItems, actions,
		onBuildIds, onGetExpandedContent, columnsWidths: gridTemplateColumns,
	} = props;

	// eslint-disable-next-line no-param-reassign
	const columnsInfo = columns.filter(({ hidden }) => !hidden).map((column, colIndex) => {
		switch (column.format) {
			case DataFormats.Checkbox:
				cellId = onBuildIds?.cell?.('checkbox', item);
				align = Positioning.Center;
				fixed = Positioning.Left;
				children = onCheckItems
					? renderers[DataFormats.Checkbox]({
						id: onBuildIds?.checkbox?.(column.key, item),
						fixed: Positioning.Left,
						checked: checkedItems?.includes(item[idProp]),
						onChange: () => onCheckItems(item[idProp]),
					})
					: null;
				break;
			case DataFormats.Expander:
				cellId = onBuildIds?.cell?.('expander', item);
				align = Positioning.Center;
				fixed = Positioning.Left;
				children = (onExpandItems && onGetExpandedContent)
					? renderers[DataFormats.Expander]({
						id: onBuildIds?.expander?.(column.key, item),
						fixed: Positioning.Left,
						isExpanded: expandedItems?.includes(item[idProp]),
						onClick: () => onExpandItems(item[idProp]),
					})
					: null;
				break;
			default:
				cellId = onBuildIds?.cell?.(column.key, item);
				align = column.align;
				fixed = column.fixed;
				const defaultRenderer = renderers[column.format ?? DataFormats.String];
				const customRenderer = customRenderers?.[column.key];
				const data = customRenderer ? customRenderer({ item, column }) : item[column.key];
				children = defaultRenderer({ data });
				break;
		}

		return (
			<TD
				id={cellId}
				key={`${index}-${colIndex}`}
				fixed={fixed}
				left={column.left}
				right={column.right}
			>
				<TableCellContent align={align}>
					{ children }
				</TableCellContent>
			</TD>
		);
	});

	return (
		<TableRow
			id={id}
			bg={bg}
			role="tr"
			style={{ gridTemplateColumns }}
		>
			{columnsInfo}
			<Actions>
				{ actions }
			</Actions>
		</TableRow>
	);
}

export const TR = React.memo(Row) as typeof Row;
