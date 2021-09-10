import React, { useMemo, useRef } from 'react';

import { TextAlignment } from '@xapp/shared/types';
import { ITableProps, ITableRefsProps, TableCellFormats } from './types';
import {
	TableContainer,
	Table,
	TableHeader,
	TableCell,
	TableCellContent,
	ExpandedCell,
	BottomShadow,
	TopShadow,
} from './components';
import { useTableManager, useRenderer as renderers } from './hooks';
import { theme } from './theme';

const Loading = () => (
	<ExpandedCell align={TextAlignment.Center} bg="#efefef">
		Loading ...
	</ExpandedCell>
);

export function DataTable<T extends { id: number | string }= any>(props: ITableProps<T>) {
	const refs: ITableRefsProps = {
		wrapper: useRef<HTMLDivElement>(null),
		body: useRef<HTMLDivElement>(null),
		topShadow: useRef<HTMLDivElement>(null),
		bottomShadow: useRef<HTMLDivElement>(null),
	};
	const config = { ...theme, ...props.theme };

	const {
		data,
		headers,
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll,
		onColumnSorting,
	} = useTableManager({ ...props, theme: config, refs });

	const tableHeaders = useMemo(() => headers.map((column, index) => {
		let children: React.ReactElement;
		let align: TextAlignment;
		let isControl = false;

		switch (column.format) {
			case TableCellFormats.Checkbox:
				isControl = true;
				align = TextAlignment.Center;
				children = renderers[TableCellFormats.Checkbox]({
					id: props.onBuildIds?.header?.(column.key),
					disabled: !data.length,
					onChange: onCheckAll,
				});
				break;
			case TableCellFormats.Expander:
				isControl = true;
				align = TextAlignment.Center;
				children = null;
				break;
			default:
				children = (
					renderers[TableCellFormats.String]({ data: column.label })
				);
				break;
		}

		return (
			<TableHeader
				{...column}
				key={`column-${index}`}
				index={index}
				isLast={index === headers.length - 1}
				isResizing={index === resizingColumnIndex}
				isControl={isControl}
				onResize={onStartResizingColumn}
				onSort={() => onColumnSorting(index)}
				tableHeight={refs.body.current?.offsetHeight || 'auto'}
			>
				<TableCellContent align={align}>{children}</TableCellContent>
			</TableHeader>
		);
	}), [headers, resizingColumnIndex, refs.body.current?.offsetHeight, onCheckAll, onStartResizingColumn]);

	const tableRows = useMemo(() => props.isDataLoaded
		? data.reduce((result, item, rowIndex) => {
			let children: React.ReactElement;
			let align: TextAlignment;
			if (!props.isDataLoaded) {
				return [];
			}
			const isExpanded = props.expandedItems.includes(item.id);
			const expandedContent = isExpanded ? props.onGetExpandedContent?.(item) : null;

			// eslint-disable-next-line no-param-reassign
			result = result.concat(
				headers.map((column, colIndex) => {
					switch (column.format) {
						case TableCellFormats.Checkbox:
							align = TextAlignment.Center;
							children = props.onCheckItems
								? renderers[TableCellFormats.Checkbox]({
									id: props.onBuildIds?.checkbox?.(column.key, item.id),
									fixedLeft: true,
									checked: props.checkedItems?.includes(item.id),
									onChange: () => props.onCheckItems(item.id),
								})
								: null;
							break;
						case TableCellFormats.Expander:
							align = TextAlignment.Center;
							children = (props.onExpandItems && props.onGetExpandedContent)
								? renderers[TableCellFormats.Expander]({
									id: props.onBuildIds?.expander?.(column.key, item.id),
									fixedLeft: true,
									isExpanded: props.expandedItems?.includes(item.id),
									onClick: () => props.onExpandItems(item.id),
								})
								: null;
							break;
						default:
							align = column.align;
							const defaultRenderer = renderers[column.format ?? TableCellFormats.String];
							const customRenderer = props.customRenderers?.[column.key];
							const data = customRenderer ? customRenderer({ item, column }) : item[column.key];
							children = defaultRenderer({ data });
							break;
					}
					return (
						<TableCell
							key={`${rowIndex}-${colIndex}`}
							fixedLeft={column.fixedLeft}
							fixedRight={column.fixedRight}
						>
							<TableCellContent align={align}>
								{ children }
							</TableCellContent>
						</TableCell>
					);
				}),
			);

			if (expandedContent) {
				result.push(
					<ExpandedCell bg="#fff">
						{ expandedContent }
					</ExpandedCell>,
				);
			}

			return result;
		}, [] as React.ReactNode[])
		: []
	, [
		headers,
		props.isDataLoaded,
		props.customRenderers,
		props.expandedItems,
		props.checkedItems,
		props.customRenderers,
		props.onBuildIds,
	]);

	return (
		<TableContainer
			role="table-container"
			ref={refs.wrapper}
			rows={tableRows.length}
			colsWidths={columnsWidths}
			theme={theme}
			rowHeight={state.rowHeight}
		>
			<TopShadow top={state.rowHeight} ref={refs.topShadow} />
			<Table role="table" ref={refs.body}>
				{ tableHeaders }
				{ props.isDataLoaded ? tableRows : <Loading /> }
			</Table>
			<BottomShadow />
			{/* <Spinner visible={props.isDataLoaded} size="small" /> */}
		</TableContainer>
	);
}
