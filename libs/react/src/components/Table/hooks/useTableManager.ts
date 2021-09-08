import { useState, useMemo, useRef, useCallback, ChangeEvent } from 'react';

import { SortDirections } from '@xapp/shared/types';

import { useColumnResize, useScrolling, useColumnSorting } from '.';
import { ITableColumn, ITableProps, ITableState, ITableRefsProps, IColumnKey } from '../types';

export const useTableManager = <T extends IColumnKey = any>(
	props: ITableProps<T> & { refs: ITableRefsProps },
): {
	headers: ITableColumn[];
	data: T[];
	columnsWidths: (number | 'auto')[];
	state: ITableState<T>;
	resizingColumnIndex: number;
	onStartResizingColumn: (id: number) => void;
	onCheckAll: (e: ChangeEvent<HTMLInputElement>) => void;
} => {
	const {
		columns = [],
		data = [],
		config: { rowHeight, rowsPerBody, minCellWidth },
		allowCheckAll = true,
		onCheckItems,
		refs,
	} = props;
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

	useScrolling<T>({
		state,
		topShadowRef: refs.topShadow,
		tableRef: refs.wrapper,
		onUpdateState: setState,
	});

	const { onColumnSorting } = useColumnSorting<T>({
		state,
		onUpdateState: setState,
	});

	const columnsWidths = useMemo(
		() => state.columns.map((col) => (col.width ? col.width + 10 : 'auto')),
		[state.columns],
	);

	function getColumns(columns: ITableColumn[]) {
		return columns.map((col, index) => ({
			index,
			...col,
			forwardRef: useRef(),
			onSort: (sort: SortDirections) => onColumnSorting(index, sort),
		}));
	}

	const handleCheckAll = useCallback(
		({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
			if (!allowCheckAll) return;

			const allItemIds = checked ? data.map((item) => item.id) : [];

			if (typeof onCheckItems === 'function') {
				onCheckItems(allItemIds);
			}
		},
		[onCheckItems, data],
	);

	const tableHeaders = useMemo(() => state.columns, [state.columns, refs.body.current?.offsetHeight]);

	return {
		headers: tableHeaders,
		data: state.data.slice(state.displayStart, state.displayEnd),
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn: setResizingColumnIndex,
		onCheckAll: handleCheckAll,
	};
	// , [
	// 	tableHeaders,
	// 	state.data,
	// 	columnsWidths,
	// 	state,
	// 	resizingColumnIndex,
	// 	setResizingColumnIndex,
	// 	handleCheckAll
	// ]);
};
