import React, { useEffect, useState, useRef, useMemo, useLayoutEffect } from 'react';

import { SortDirections } from '@xapp/shared/types';
import { ITableColumn, ITableProps, ITableState } from './types';
import {
	TableHeader,
	TableCell,
	Spinner,
	BottomShadow,
	TableCellContent,
	TableContent,
	TableWrapper,
	TopShadow,
} from './components';

import { useColumnResize } from './hooks';

const defaults = {
	rowHeight: 25,
	rowsPerBody: 50,
	minCellWidth: 40,
};

export function Table<T = any>(props: ITableProps<T>) {
	const tableWrapperRef = useRef<HTMLDivElement>();
	const tableRef = useRef<HTMLDivElement>();
	const topShadowRef = useRef<HTMLDivElement>();
	const { columns = [], rows = [], rowHeight = 25, rowsPerBody = 100, minCellWidth = 40 } = props;
	const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(null);
	const [state, setState] = useState<ITableState<T>>({
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		columns: getColumns(columns),
		rows,
		loading: false,
		total: rows.length,
		rowHeight,
		rowsPerBody,
		visibleStart: 0,
		visibleEnd: rowsPerBody,
		displayStart: 0,
		displayEnd: rowsPerBody * 2,
		scroll: 0,
		shouldUpdate: false,
	});

	useColumnResize({
		columns: state.columns,
		resizingColumnIndex,
		minCellWidth,
		tableRef,
		onStartResizingColumn: setResizingColumnIndex,
	});

	const columnsWidth = useMemo(
		() => state.columns.map((col) => (col.width ? col.width + 10 : 'auto')),
		[state.columns],
	);

	function sortDataByColumn(index: number, order: SortDirections) {
		const updateRows = [...state.rows].sort((a, b) => {
			if (a[index] === b[index]) {
				return 0;
			}
			else if (order === SortDirections.DESC) {
				return a[index] < b[index] ? 1 : -1;
			}
			return a[index] > b[index] ? 1 : -1;
		});

		setState((prevState) => ({
			...prevState,
			rows: updateRows,
			shouldUpdate: true,
		}));
	}

	function handleSortColumn(index: number, sortOrder: SortDirections | null) {
		let sortIndex = 0;
		let sort = sortOrder;

		const columns = state.columns.map((col, i) => {
			if (i === index) {
				if (columns[i].sort === null) {
					sortIndex = i;
					sort = SortDirections.ASC;
				}
				else if (columns[i].sort === SortDirections.ASC) {
					sortIndex = i;
					sort = SortDirections.DESC;
				}
				else {
					columns[i].sort = null;
					columns[0].sort = SortDirections.ASC;
				}
			}
			else {
				columns[i].sort = null;
			}

			return {
				...col,
				sort,
			};
		});

		sortDataByColumn(sortIndex, sortOrder);
		setState((prevState) => ({ ...prevState, columns }));
	}

	function getColumns(columns: ITableColumn[]) {
		return columns.map((col, index) => ({
			index,
			...col,
			forwardRef: useRef(),
			onSort: (sort: SortDirections | null) => handleSortColumn(index, sort),
		}));
	}

	function handleScrolling() {
		const scroll = tableWrapperRef.current.scrollTop;
		const visibleStart = Math.floor(scroll / state.rowHeight);
		const visibleEnd = Math.floor(Math.min(visibleStart + state.rowsPerBody, state.total - 1)) + state.rowHeight;
		const displayStart = Math.floor(Math.max(0, Math.floor(scroll / state.rowHeight) - state.rowsPerBody * 1.5));
		const displayEnd =
			Math.floor(Math.min(displayStart + 4 * state.rowsPerBody, state.total - 1)) + state.rowHeight;
		if (
			state.shouldUpdate ||
			!(visibleStart >= state.displayStart && visibleEnd + state.rowsPerBody <= state.displayEnd)
		) {
			setState((prevState) => ({
				...prevState,
				visibleStart,
				visibleEnd,
				displayStart,
				displayEnd,
				scroll,
				shouldUpdate: false,
			}));
		}

		topShadowRef.current.style.display = scroll > 0 ? 'block' : 'none';
	}

	useEffect(() => {
		window.requestAnimationFrame(() => {
			if (tableRef.current) {
				const rowHeight = Math.floor(
					tableRef.current.querySelector<HTMLDivElement>('[role=tablecell]').offsetHeight,
				);
				const contentHeight = Math.floor(tableRef.current.offsetHeight);
				const rowsPerBody = Math.floor(contentHeight / rowHeight);

				setState((prevState) => ({
					...prevState,
					rowHeight: rowHeight < 1 ? 30 : rowHeight,
					rowsPerBody,
					visibleStart: 0,
					visibleEnd: rowsPerBody,
					displayStart: 0,
					displayEnd: rowsPerBody * 4,
				}));
			}
		});
	}, [tableRef.current]);

	useLayoutEffect(() => {
		tableWrapperRef.current?.addEventListener('scroll', handleScrolling, false);
	}, [tableWrapperRef.current, handleScrolling]);

	const tableHeaders = useMemo(
		() =>
			state.columns.map((column, index) => (
				<TableHeader
					{...column}
					key={`column-${index}`}
					index={index}
					isLast={index === state.columns.length - 1}
					isResizing={index === resizingColumnIndex}
					onResize={setResizingColumnIndex}
					tableHeight={tableRef.current?.offsetHeight || 'auto'}
				/>
			)),
		[state.columns, tableRef.current?.offsetHeight],
	);

	const tableRows = useMemo(() => {
		const virtualRows = state.rows.slice(state.displayStart, state.displayEnd);
		return virtualRows.reduce((result, row, rowIndex) => {
			// eslint-disable-next-line no-param-reassign
			result = result.concat(
				state.columns.map((column, colIndex) => (
					<TableCell
						key={`${rowIndex}-${colIndex}`}
						row={rowIndex}
						column={colIndex}
						align={column.align}
						fixedLeft={column.fixedLeft}
						fixedRight={column.fixedRight}
					>
						<TableCellContent>{row[column.name]}</TableCellContent>
					</TableCell>
				)),
			);
			return result;
		}, []);
	}, [state.rows, state.displayStart, state.displayEnd, state.columns]);

	return (
		<TableWrapper role="table" ref={tableWrapperRef} cols={columnsWidth} rows={state.rows.length}>
			<TopShadow top={defaults.rowHeight} ref={topShadowRef} />
			<TableContent
				ref={tableRef}
				height={state.total * state.rowHeight}
				paddingTop={state.displayStart * state.rowHeight}
				paddingBottom={state.rowHeight * 1.5}
			>
				{tableHeaders}
				{tableRows}
			</TableContent>
			<BottomShadow />
			<Spinner visible={state.loading} size="small" />
		</TableWrapper>
	);
}
