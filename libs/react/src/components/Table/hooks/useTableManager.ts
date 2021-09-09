import { useState, useMemo, useRef, useCallback, ChangeEvent } from 'react';

import { useColumnResize, useScrolling, useColumnSorting } from '.';
import { ITableProps, ITableState, ITableRefsProps, IColumnKey, ITableColumn, TableCellFormats } from '../types';

const getWidth = (col: ITableColumn) => {
	if ([TableCellFormats.Checkbox, TableCellFormats.Expander].includes(col.format)) {
		return 32;
	}

	return col.width
		? col.width + 25
		: col.width;
};

export const useTableManager = <T extends IColumnKey = any>(
	props: ITableProps<T> & { refs: ITableRefsProps },
) => {
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
		columns: columns.map((col, index) => ({
			index,
			...col,
			width: getWidth(col),
			forwardRef: useRef(),
		})),
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
		() => state.columns.map((col) => (col.width ? col.width : 'auto')),
		[state.columns],
	);

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
		onColumnSorting,
	};
};
