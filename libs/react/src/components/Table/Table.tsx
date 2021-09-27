import React, { useMemo, useRef } from 'react';

import { TextAlignment } from '@xapp/shared/types';
import { ITableProps, ITableRefsProps, IColumnKey, TableCellFormats, ColumnStick } from './types';
import {
	TableContainer,
	Table,
	TableHeader,
	TD,
	TableCellContent,
	ExpandedCell,
	THead,
	TR,
	TBody,
	Loading,
	BottomShadow,
	TopShadow,
	RightShadow,
	LeftShadow,
	Toolbar,
	Footer,
} from './components';
import { useTableManager, useRenderer as renderers } from './hooks';
import { theme } from './theme';

const MessageCell = ({ children }: { children: React.ReactElement | string }) => (
	<ExpandedCell align={TextAlignment.Center} bg={theme.messageRowColor}>
		{ children }
	</ExpandedCell>
);

export function DataTable<T extends IColumnKey = any>(props: ITableProps<T>) {
	const refs: ITableRefsProps = {
		wrapper: useRef<HTMLDivElement>(null),
		header: useRef<HTMLDivElement>(null),
		body: useRef<HTMLDivElement>(null),
		shadow: {
			top: useRef<HTMLDivElement>(null),
			right: useRef<HTMLDivElement>(null),
			bottom: useRef<HTMLDivElement>(null),
			left: useRef<HTMLDivElement>(null),
		},
	};
	const config = { ...theme, ...props.theme };
	const { idProp = 'id', onBuildIds, noRecordsMessage = 'No Records found' } = props;

	const {
		data,
		headers,
		shadowLeft,
		shadowRight,
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll,
		onColumnSorting,
	} = useTableManager<T>({ ...props, theme: config, refs });

	const gridTemplateColumns = headers.map(({ width }) => width ? ` ${width}px` : ' auto').join(' ');

	const tableHeader = useMemo(() => headers.map((column, index) => {
		let children: React.ReactElement;
		let align: TextAlignment;
		let isControl = false;
		let fixed: ColumnStick;

		switch (column.format) {
			case TableCellFormats.Checkbox:
				isControl = true;
				fixed = ColumnStick.Left;
				align = TextAlignment.Center;
				children = renderers[TableCellFormats.Checkbox]({
					id: onBuildIds?.header?.(column.key),
					disabled: !data.length,
					onChange: onCheckAll,
				});
				break;
			case TableCellFormats.Expander:
				isControl = true;
				fixed = ColumnStick.Left;
				align = TextAlignment.Center;
				children = null;
				break;
			default:
				fixed = column.fixed;
				children = renderers[TableCellFormats.String]({ data: column.label });
				break;
		}

		return (
			<TableHeader
				{...{ ...column, fixed }}
				id={onBuildIds?.header?.(column.key)}
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

	const tableBody = useMemo(() => {
		if (props.isLoading) {
			return (
				<MessageCell>
					<Loading />
				</MessageCell>
			);
		}

		if (!data.length) {
			return (
				<MessageCell>
					{ noRecordsMessage }
				</MessageCell>
			);
		}

		return data.reduce((result, item, rowIndex) => {
			let children: React.ReactElement;
			let align: TextAlignment;
			let fixed: ColumnStick;
			let cellId: string;

			const isExpanded = props.expandedItems.includes(item[idProp]);
			const expandedContent = isExpanded ? props.onGetExpandedContent?.(item) : null;

			// eslint-disable-next-line no-param-reassign
			const columns = headers.map((column, colIndex) => {
				switch (column.format) {
					case TableCellFormats.Checkbox:
						cellId = onBuildIds?.cell?.('checkbox', item);
						align = TextAlignment.Center;
						fixed = ColumnStick.Left;
						children = props.onCheckItems
							? renderers[TableCellFormats.Checkbox]({
								id: onBuildIds?.checkbox?.(column.key, item),
								fixed: ColumnStick.Left,
								checked: props.checkedItems?.includes(item[idProp]),
								onChange: () => props.onCheckItems(item[idProp]),
							})
							: null;
						break;
					case TableCellFormats.Expander:
						cellId = onBuildIds?.cell?.('expander', item);
						align = TextAlignment.Center;
						fixed = ColumnStick.Left;
						children = (props.onExpandItems && props.onGetExpandedContent)
							? renderers[TableCellFormats.Expander]({
								id: onBuildIds?.expander?.(column.key, item),
								fixed: ColumnStick.Left,
								isExpanded: props.expandedItems?.includes(item[idProp]),
								onClick: () => props.onExpandItems(item[idProp]),
							})
							: null;
						break;
					default:
						cellId = onBuildIds?.cell?.(column.key, item);
						align = column.align;
						fixed = column.fixed;
						const defaultRenderer = renderers[column.format ?? TableCellFormats.String];
						const customRenderer = props.customRenderers?.[column.key];
						const data = customRenderer ? customRenderer({ item, column }) : item[column.key];
						children = defaultRenderer({ data });
						break;
				}

				return (
					<TD
						id={cellId}
						key={`${rowIndex}-${colIndex}`}
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

			const bgColor = rowIndex % 2 === 0 ? theme.evenRowColor : theme.oddRowColor;

			// eslint-disable-next-line no-param-reassign
			result = result.concat(
				<TR
					key={rowIndex}
					id={onBuildIds?.row?.(item)}
					bg={bgColor}
					style={{ gridTemplateColumns }}
				>
					{columns}
				</TR>,
			);

			if (expandedContent) {
				result.push(
					<TR bg={bgColor}>
						<ExpandedCell
							key={`expanded-${item[idProp]}`}
							borderColor={theme.borderColor}
						>
							{ expandedContent }
						</ExpandedCell>
					</TR>,
				);
			}

			return result;
		}, [] as React.ReactNode[]);
	}, [
		headers,
		props.data,
		props.idProp,
		props.isLoading,
		props.customRenderers,
		props.expandedItems,
		props.checkedItems,
		props.onGetExpandedContent,
		props.onBuildIds,
		props.onExpandItems,
		props.onCheckItems,
	]);

	return (
		<TableContainer
			role="table-container"
			rows={data.length}
			colsWidths={columnsWidths}
			theme={theme}
			rowHeight={state.rowHeight}
			hasHeader={true}
			hasFooter={true}
		>
			<Toolbar>Toolbar</Toolbar>
			<Table id={props.id} role="table" ref={refs.wrapper}>
				<TopShadow top={state.rowHeight} ref={refs.shadow.top} />
				<LeftShadow left={shadowLeft} ref={refs.shadow.left} />
				<RightShadow right={shadowRight} ref={refs.shadow.right} />
				<THead ref={refs.header} style={{ gridTemplateColumns }}>
					{ tableHeader }
				</THead>
				<TBody ref={refs.body}>
					{ tableBody }
				</TBody>
				<BottomShadow ref={refs.shadow.bottom}/>
			</Table>
			<Footer>Footer</Footer>
		</TableContainer>
	);
}
