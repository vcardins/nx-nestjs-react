import React, { useMemo, useRef } from 'react';

import { Positioning, DataFormats, IColumnInfo } from '@xapp/shared/types';
import { ITableProps, ITableRefsProps, IColumnKey } from './types';
import {
	TableContainer,
	Table,
	ColumnHeader,
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
	Slot,
	Toolbar,
} from './components';
import { useTableManager, useRenderer as renderers } from './hooks';
import { defaultSettings } from './settings';

const MessageCell = ({ children }: { children: React.ReactElement | string }) => (
	<ExpandedCell align={Positioning.Center} bg={defaultSettings.messageRowColor}>
		{ children }
	</ExpandedCell>
);
function buildColumns<T extends IColumnKey = any>(props: {
	columns: IColumnInfo[];
	onBuildIds: ITableProps<T>['onBuildIds'];
	addCheckbox: boolean;
	addExpander: boolean;
}) {
	const getWidth = (col: IColumnInfo) => {
		if ([DataFormats.Checkbox, DataFormats.Expander].includes(col.format)) {
			return 32;
		}

		return col.width
			? col.width + 25
			: col.width;
	};

	const columns = [
		props.addCheckbox && {
			id: props.onBuildIds?.checkboxAll?.(),
			format: DataFormats.Checkbox,
			width: 32,
			resizable: false,
			fixed: Positioning.Left,
			sortable: false,
			filterable: false,
			key: 'checkbox',
		} as IColumnInfo,
		props.addExpander && {
			format: DataFormats.Expander,
			width: 32,
			resizable: false,
			fixed: Positioning.Left,
			sortable: false,
			filterable: false,
			key: 'expander',
		} as IColumnInfo,
		...props.columns,
	].filter(Boolean) as IColumnInfo[];

	return columns.map((col, index) => ({
		...col,
		index,
		width: getWidth(col),
		forwardRef: useRef(),
	}));
}

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
	const settings = { ...defaultSettings, ...props.settings };
	const { idProp = 'id', onBuildIds, actions, noRecordsMessage = 'No Records found' } = props;
	const {
		data,
		headers,
		shadowLeft,
		shadowRight,
		columnsWidths,
		onToggleColumnDisplay,
		state,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll,
		onColumnSorting,
	} = useTableManager<T>({
		...props,
		columns: buildColumns<T>({
			columns: props.columns,
			onBuildIds: props.onBuildIds,
			addCheckbox: typeof props.onCheckItems === 'function',
			addExpander: (typeof props.onExpandItems === 'function' && typeof props.onGetExpandedContent === 'function' ),
		}),
		settings,
		refs,
	});


	const gridTemplateColumns = useMemo(() => headers.map(({ width, hidden }) => {
		if (hidden) return;
		return width ? ` ${width}px` : ' auto';
	}).filter(Boolean).join(' '), [headers]);


	const tableHeader = useMemo(() => headers.filter(({ hidden }) => !hidden).map((column, index) => {
		let children: React.ReactElement;
		let align: Positioning;
		let isControl = false;
		let fixed: Positioning;

		switch (column.format) {
			case DataFormats.Checkbox:
				isControl = true;
				fixed = Positioning.Left;
				align = Positioning.Center;
				children = renderers[DataFormats.Checkbox]({
					id: onBuildIds?.header?.(column.key),
					disabled: !data.length,
					onChange: onCheckAll,
				});
				break;
			case DataFormats.Expander:
				isControl = true;
				fixed = Positioning.Left;
				align = Positioning.Center;
				children = null;
				break;
			default:
				fixed = column.fixed;
				children = renderers[DataFormats.String]({ data: column.label });
				break;
		}

		return (
			<ColumnHeader
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
			</ColumnHeader>
		);
	}), [
		headers,
		resizingColumnIndex,
		refs.body.current?.offsetHeight,
		onCheckAll,
		onStartResizingColumn,
	]);

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
			let align: Positioning;
			let fixed: Positioning;
			let cellId: string;

			const isExpanded = props.expandedItems.includes(item[idProp]);
			const expandedContent = isExpanded ? props.onGetExpandedContent?.(item) : null;

			// eslint-disable-next-line no-param-reassign
			const columns = headers.filter(({ hidden }) => !hidden).map((column, colIndex) => {
				switch (column.format) {
					case DataFormats.Checkbox:
						cellId = onBuildIds?.cell?.('checkbox', item);
						align = Positioning.Center;
						fixed = Positioning.Left;
						children = props.onCheckItems
							? renderers[DataFormats.Checkbox]({
								id: onBuildIds?.checkbox?.(column.key, item),
								fixed: Positioning.Left,
								checked: props.checkedItems?.includes(item[idProp]),
								onChange: () => props.onCheckItems(item[idProp]),
							})
							: null;
						break;
					case DataFormats.Expander:
						cellId = onBuildIds?.cell?.('expander', item);
						align = Positioning.Center;
						fixed = Positioning.Left;
						children = (props.onExpandItems && props.onGetExpandedContent)
							? renderers[DataFormats.Expander]({
								id: onBuildIds?.expander?.(column.key, item),
								fixed: Positioning.Left,
								isExpanded: props.expandedItems?.includes(item[idProp]),
								onClick: () => props.onExpandItems(item[idProp]),
							})
							: null;
						break;
					default:
						cellId = onBuildIds?.cell?.(column.key, item);
						align = column.align;
						fixed = column.fixed;
						const defaultRenderer = renderers[column.format ?? DataFormats.String];
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

			const bgColor = rowIndex % 2 === 0 ? settings.evenRowColor : settings.oddRowColor;

			// eslint-disable-next-line no-param-reassign
			result = result.concat(
				<TR
					key={rowIndex}
					id={onBuildIds?.row?.(item)}
					bg={bgColor}
					columnsWidths={gridTemplateColumns}
					actions={actions.map((action) => action(item))}
				>
					{columns}
				</TR>,
			);

			if (expandedContent) {
				result.push(
					<TR
						id={`${onBuildIds?.row?.(item)}-expanded`}
						bg={bgColor}
						key={`${rowIndex}-expanded`}
					>
						<ExpandedCell
							key={`expanded-${item[idProp]}`}
							borderColor={settings.borderColor}
							maxHeight={settings.maxExpandedContentHeight}
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
		data,
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
			settings={settings}
			rowHeight={state.rowHeight}
			showHeader={true}
			showFooter={true}
		>
			<Slot position="top">
				<Toolbar
					id={`${props.id}-toolbar`}
					columns={headers}
					onToggleColumnDisplay={onToggleColumnDisplay}
					filtersForm={props.filtersForm}
				/>
			</Slot>
			<Table role="table" id={props.id} ref={refs.wrapper}>
				<TopShadow top={state.rowHeight} ref={refs.shadow.top} />
				<LeftShadow left={shadowLeft} ref={refs.shadow.left} />
				<RightShadow right={shadowRight} ref={refs.shadow.right} />
				<THead role="thead" ref={refs.header} style={{ gridTemplateColumns }}>
					{ tableHeader }
				</THead>
				<TBody role="tbody" ref={refs.body}>
					{ tableBody }
				</TBody>
				<BottomShadow ref={refs.shadow.bottom}/>
			</Table>
			<Slot position="bottom" borderless={true} />
		</TableContainer>
	);
}
