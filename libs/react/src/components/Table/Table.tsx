import React, { useMemo, useRef, useState } from 'react';

import { Positioning, DataFormats, PaginationMode, IColumnInfo } from '@xapp/shared/types';

import * as S from './components/Table.styles';

import { ITableProps, ITableRefsProps, IColumnKey } from './types';
import { ColumnHeader, ExpandedCell, Loading, Slot, Pagination, TableRow } from './components';

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
		allowCheckAll: rawProps.allowCheckAll || true,

		noRecordsMessage: rawProps.noRecordsMessage ?? 'No Records found',
		pagination: rawProps.pagination ?? { mode: PaginationMode.None },
	};
	const settings = { ...defaultSettings, ...props.settings };

	const {
		pagination,
		columns,
		shadowLeft,
		shadowRight,
		columnsWidths,
		rowHeight,
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
						id: props.onBuildIds?.checkboxAll?.(),
						disabled: !pagination.total,
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
			if (column.format === DataFormats.Checkbox) {
				console.log(children);
			}

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
					<S.TableCellContent align={align}>
						{children}
					</S.TableCellContent>
				</ColumnHeader>
			);
		}),
	[
		columns,
		pagination,
		renderers,
		resizingColumnIndex,
		refs.body.current?.offsetHeight,
		props.onBuildIds,
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

		if (!pagination.data.length) {
			return (
				<MessageCell>
					{ props.noRecordsMessage }
				</MessageCell>
			);
		}

		return pagination.data.reduce((result, item, rowIndex) => {
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
					item={item}
					columnsWidths={columnsWidths}
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
		pagination.data,
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
			rows={pagination.data.length}
			settings={settings}
			rowHeight={rowHeight}
			showHeader={true}
			showFooter={pagination.isPaginated}
		>
			{props.toolbar && (
				<Slot position={Positioning.Top}>
					{props.toolbar}
				</Slot>
			)}
			<S.Table role="table" id={props.id} ref={refs.wrapper}>
				<S.TopShadow top={rowHeight} ref={refs.shadow.top} />
				<S.LeftShadow left={shadowLeft} ref={refs.shadow.left} />
				<S.RightShadow right={shadowRight} ref={refs.shadow.right} />
				<S.THead role="thead" ref={refs.header} style={{ gridTemplateColumns: columnsWidths }}>
					{ tableHeader }
				</S.THead>
				<S.TBody role="tbody" ref={refs.body}>
					{ tableBody }
				</S.TBody>
				<S.BottomShadow ref={refs.shadow.bottom} showFooter={pagination.isPaginated}/>
			</S.Table>
			{pagination.isPaginated && (
				<Slot
					id={`${props.id}-footer`}
					position={Positioning.Bottom}
					alignment={Positioning.Center}
				>
					<Pagination
						currentPage={pagination.currentPage}
						totalCount={pagination.total}
						pageSize={pagination.pageSize}
						onPageChange={(page) => pagination.onPageChange(page)}
					/>
				</Slot>
			)}
		</S.TableContainer>
	);
}

DataTable.displayName = 'DataTable';
