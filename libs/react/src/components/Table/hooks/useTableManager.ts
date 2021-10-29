import { useState, useMemo, useCallback, ChangeEvent, useEffect } from 'react';

import { Positioning, IColumnInfo } from '@xapp/shared/types';
import { useColumnResize, useScrolling, useColumnSorting } from '.';
import { ITableProps, ITableState, ITableRefsProps, IColumnKey } from '../types';

const calcPosition = (
	pos: Positioning,
	collection: IColumnInfo[],
	column: IColumnInfo,
	index: number,
): IColumnInfo => ({
	...column,
	resizable: false,
	[pos]: index === 0 ? index : collection.slice(0, index).reduce((result, { width }) => result + (width ?? 0), 0),
});

export const useTableManager = <T extends IColumnKey = any>(props: ITableProps<T> & { refs: ITableRefsProps }) => {
	const [resizingColumnIndex, onStartResizingColumn] = useState<number | null>(null);
	const [state, setState] = useState<ITableState<T>>({
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		columns: props.columns,
		data: props.data,
		loading: false,
		total: props.data.length,
		rowHeight: props.settings.rowHeight,
		rowsPerBody: props.settings.rowsPerBody,
		visibleStart: 0,
		visibleEnd: props.settings.rowsPerBody,
		displayStart: 0,
		displayEnd: props.settings.rowsPerBody * 2,
		verticalScroll: 0,
		shouldUpdate: false,
	});

	const { columns, shadowLeft, shadowRight } = useMemo(() => {
		let left = state.columns.filter(({ fixed }) => fixed === Positioning.Left);
		left = left.map((col, index) => calcPosition(Positioning.Left, left, col, index));

		const center = state.columns.filter(({ fixed }) => fixed === undefined);

		let right = [...state.columns].reverse().filter(({ fixed }) => fixed === Positioning.Right);
		right = right.map((col, index) => calcPosition(Positioning.Right, right, col, index));

		return {
			columns: [...left, ...center, ...right.reverse()],
			shadowLeft: left.reduce((result, { width }) => result + width, -1),
			shadowRight: right.reduce((result, { width }) => result + width, 0),
		};
	}, [props.columns]);

	useEffect(() => {
		setState((prevState) => ({ ...prevState, data: props.data }));
	}, [props.data]);

	useColumnResize({
		columns: state.columns,
		resizingColumnIndex,
		minCellWidth: props.settings.minCellWidth,
		refs: props.refs,
		onStartResizingColumn,
	});

	useScrolling<T>({ refs: props.refs, state, onUpdateState: setState });

	const { onColumnSorting } = useColumnSorting<T>({
		columns: state.columns,
		data: state.data,
		onUpdateState: setState,
	});

	const columnsWidths = useMemo(() => state.columns.map((col) => (col.width ? col.width : 'auto')), [state.columns]);

	const handleCheckAll = useCallback(
		({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
			if (!props.allowCheckAll) return;

			const allItemIds = checked ? state.data.map((item) => item.id) : [];

			if (typeof props.onCheckItems === 'function') {
				props.onCheckItems(allItemIds);
			}
		},
		[props.onCheckItems, state.data],
	);

	return {
		columns,
		shadowLeft,
		shadowRight,
		data: state.data, // .slice(state.displayStart, state.displayEnd),
		columnsWidths,
		rowHeight: state.rowHeight,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll: handleCheckAll,
		onColumnSorting,
	};
};
