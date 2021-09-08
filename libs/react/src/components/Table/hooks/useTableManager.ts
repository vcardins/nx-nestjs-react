import { useLayoutEffect, useState, useEffect, useMemo, useRef, useCallback, ChangeEvent } from 'react';

import { SortDirections } from '@xapp/shared/types';

import { useColumnResize } from '.';
import { ITableColumn, ITableProps, ITableState, ITableRefsProps, IColumnKey } from '../types';

export const useTableManager = <T extends IColumnKey = any>(props: ITableProps<T> & { refs: ITableRefsProps }) => {
	const { columns = [], data = [], config: { rowHeight, rowsPerBody, minCellWidth }, allowCheckAll = true, onCheckItems, refs } = props;
	const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(null);
	const [state, setState] = useState<ITableState<T>>({
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		columns: getColumns(columns),
		data,
		loading: false,
		total: data.length,
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
		tableRef: refs.body,
		onStartResizingColumn: setResizingColumnIndex,
	});

	const columnsWidths = useMemo(
		() => state.columns.map((col) => (col.width ? col.width + 10 : 'auto')),
		[state.columns],
	);

	function sortDataByColumn(index: number, order: SortDirections) {
		const updateRows = [...state.data].sort((a, b) => {
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
			data: updateRows,
			shouldUpdate: true,
		}));
	}

	function handleSortColumn(index: number, sortOrder: SortDirections) {
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
			onSort: (sort: SortDirections) => handleSortColumn(index, sort),
		}));
	}

	const handleCheckAll = useCallback(
		({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
			if (!allowCheckAll) return;

			const allItemIds = checked
				? data.map((item) => item.id)
				: [];

			if (typeof onCheckItems === 'function') {
				onCheckItems(allItemIds);
			}
		},
		[onCheckItems, data],
	);

	function handleScrolling() {
		const scroll = refs.wrapper.current.scrollTop;
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

		refs.topShadow.current.style.display = scroll > 0 ? 'block' : 'none';
	}

	useEffect(() => {
		window.requestAnimationFrame(() => {
			if (refs.body.current) {
				const rowHeight = Math.floor(
					refs.body.current.querySelector<HTMLDivElement>('[role=tablecell]').offsetHeight,
				);
				const contentHeight = Math.floor(refs.body.current.offsetHeight);
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
	}, [refs.body.current]);

	useLayoutEffect(() => {
		refs.wrapper.current?.addEventListener('scroll', handleScrolling, false);
	}, [refs.wrapper.current, handleScrolling]);

	const tableHeaders = useMemo(
		() => state.columns,
		[state.columns, refs.body.current?.offsetHeight],
	);

	return {
		headers: tableHeaders,
		data: state.data.slice(state.displayStart, state.displayEnd),
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn: setResizingColumnIndex,
		onCheckAll: handleCheckAll,
	};
};
