import React, { useMemo, useRef, useState } from 'react';

import { Positioning, DataFormats, PaginationMode, IColumnInfo } from '@xapp/shared/types';
import { Toolbar } from '../Toolbar';
import { ListItems } from '../ListItems';

import { ITableProps, ITableRefsProps, IColumnKey } from './types';
import {
	ColumnHeader, ExpandedCell, Loading, Slot, Pagination, TableRow,
	Columns as TableIcon, Filters as FiltersIcon,
} from './components';
import * as S from './components/Table.styles';

import { useTableManager, useRenderer as renderers, useColumnToggle } from './hooks';
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

const PageSize = 20;

export function DataTable<T extends IColumnKey = any>(rawProps: ITableProps<T>) {
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
	const props: ITableProps<T> = {
		...rawProps,
		idProp: rawProps.idProp ?? 'id',
		noRecordsMessage: rawProps.noRecordsMessage ?? 'No Records found',
		pagination: rawProps.pagination ?? { mode: PaginationMode.None, pageSize: PageSize },
	};
	const settings = { ...defaultSettings, ...props.settings };
	const {
		data,
		columns,
		shadowLeft,
		shadowRight,
		columnsWidths,
		rowHeight,
		onToggleColumnDisplay,
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

	const isPaginated = props.pagination.mode === PaginationMode.Pagination;
	const [currentPage, setCurrentPage] = useState(1);
	const currentTableData = useMemo(() => {
		if (!isPaginated) {
			return data;
		}
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return data.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, data, props.pagination.mode]);

	const columnsToggler = useColumnToggle(columns, typeof onToggleColumnDisplay === 'function');

	const gridTemplateColumns = useMemo(
		() => columns.map(({ width, hidden }) => {
			if (hidden) return [];
			return width ? ` ${width}px` : ' auto';
		}).filter(Boolean).join(' ')
		, [columns],
	);

	const tableHeader = useMemo(() =>
		columns.filter(({ hidden }) => !hidden).map((column, index) => {
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
						id: props.onBuildIds?.header?.(column.key),
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

			const id = props.onBuildIds?.header?.(column.key);

			return (
				<ColumnHeader
					{...{ ...column, fixed }}
					id={id}
					key={id}
					index={index}
					isLast={index === columns.length - 1}
					isResizing={index === resizingColumnIndex}
					isControl={isControl}
					onResize={onStartResizingColumn}
					onSort={() => onColumnSorting(index)}
					tableHeight={refs.body.current?.offsetHeight || 'auto'}
				>
					<S.TableCellContent align={align}>{children}</S.TableCellContent>
				</ColumnHeader>
			);
		}),
	[
		columns,
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

		if (!currentTableData.length) {
			return (
				<MessageCell>
					{ props.noRecordsMessage }
				</MessageCell>
			);
		}

		return currentTableData.reduce((result, item, rowIndex) => {
			const isExpanded = props.expandedItems?.includes(item[props.idProp]);
			const expandedContent = isExpanded ? props?.onGetExpandedContent?.(item) : null;
			const bgColor = rowIndex % 2 === 0 ? settings.evenRowColor : settings.oddRowColor;
			const id = props.onBuildIds?.row?.(item) ?? item[props.idProp].toString();

			// eslint-disable-next-line no-param-reassign
			result = result.concat(
				<TableRow<T>
					{...props}
					id={id}
					key={`${id}-tr`}
					index={rowIndex}
					bg={bgColor}
					idProp={props.idProp}
					item={item}
					columnsWidths={gridTemplateColumns}
					actions={props.actions?.map((action) => action(item))}
					columns={columns}
				/>,
			);

			if (expandedContent) {
				result.push(
					<S.TR
						id={`${props.onBuildIds?.row?.(item)}-expanded`}
						bg={bgColor}
						key={`${id}-expanded`}
					>
						<ExpandedCell
							borderColor={settings.borderColor}
							maxHeight={settings.maxExpandedContentHeight}
						>
							{ expandedContent }
						</ExpandedCell>
					</S.TR>,
				);
			}

			return result;
		}, [] as React.ReactNode[]);
	}, [
		columns,
		currentTableData,
		props.idProp,
		props.isLoading,
		props.customRenderers,
		props.onBuildIds,
		props.expandedItems,
		props.onExpandItems,
		props.onGetExpandedContent,
		props.checkedItems,
		props.onCheckItems,
	]);

	return (
		<S.TableContainer
			role="table-container"
			rows={currentTableData.length}
			colsWidths={columnsWidths}
			settings={settings}
			rowHeight={rowHeight}
			showHeader={true}
			showFooter={isPaginated}
		>
			<Slot position={Positioning.Top}>
				<Toolbar
					id={`${props.id}-toolbar`}
					alignment={{
						left: [
							props.filtersForm && {
								id: `${props.id}-toolbar-filter`,
								icon: <FiltersIcon/>,
								title: 'Filters',
								children: props.filtersForm,
							},
						],
						right: [
							{
								id: `${props.id}-toolbar-display`,
								icon: <TableIcon/>,
								title: 'Columns Display',
								children: (
									<ListItems
										{...columnsToggler}
										showCheckbox={true}
										onSelect={onToggleColumnDisplay}
									/>
								),
							},
						],
					}}
				/>
			</Slot>
			<S.Table role="table" id={props.id} ref={refs.wrapper}>
				<S.TopShadow top={rowHeight} ref={refs.shadow.top} />
				<S.LeftShadow left={shadowLeft} ref={refs.shadow.left} />
				<S.RightShadow right={shadowRight} ref={refs.shadow.right} />
				<S.THead role="thead" ref={refs.header} style={{ gridTemplateColumns }}>
					{ tableHeader }
				</S.THead>
				<S.TBody role="tbody" ref={refs.body}>
					{ tableBody }
				</S.TBody>
				<S.BottomShadow ref={refs.shadow.bottom}/>
			</S.Table>
			{isPaginated && (
				<Slot position={Positioning.Bottom}>
					<Toolbar
						id={`${props.id}-footer`}
						alignment={{
							center: [
								{
									id: `${props.id}-pagination`,
									inline: true,
									children: (
										<Pagination
											currentPage={currentPage}
											totalCount={data.length}
											pageSize={props.pagination.pageSize}
											onPageChange={(page) => setCurrentPage(page)}
										/>
									),
								},
							],
						}}
					/>
				</Slot>
			)}
		</S.TableContainer>
	);
}

DataTable.displayName = 'DataTable';
