import { useState, useMemo, useRef, useCallback, ChangeEvent, useEffect } from 'react';

import { useColumnResize, useScrolling, useColumnSorting } from '.';
import { ITableProps, ITableState, ITableRefsProps, IColumnKey, ITableColumn, TableCellFormats, ColumnStick } from '../types';

function buildColumns<T extends IColumnKey = any>(props: {
	columns: ITableColumn[];
	onBuildIds: ITableProps<T>['onBuildIds'];
	addCheckbox: boolean;
	addExpander: boolean;
}) {
	const getWidth = (col: ITableColumn) => {
		if ([TableCellFormats.Checkbox, TableCellFormats.Expander].includes(col.format)) {
			return 32;
		}

		return col.width
			? col.width + 25
			: col.width;
	};

	const columns = [
		props.addCheckbox && {
			id: props.onBuildIds?.checkboxAll?.(),
			format: TableCellFormats.Checkbox,
			width: 32,
			resizable: false,
			fixed: ColumnStick.Left,
			sortable: false,
			filterable: false,
			key: 'checkbox',
		} as ITableColumn,
		props.addExpander && {
			format: TableCellFormats.Expander,
			width: 32,
			resizable: false,
			fixed: ColumnStick.Left,
			sortable: false,
			filterable: false,
			key: 'expander',
		} as ITableColumn,
		...props.columns,
	].filter(Boolean) as ITableColumn[];

	return columns.map((col, index) => ({
		...col,
		index,
		width: getWidth(col),
		forwardRef: useRef(),
	}));
}

export const useTableManager = <T extends IColumnKey = any>(
	props: ITableProps<T> & { refs: ITableRefsProps; },
) => {
	const {
		columns = [],
		data = [],
		theme: { rowHeight, rowsPerBody, minCellWidth },
		allowCheckAll = true,
		onCheckItems,
		onExpandItems,
		onGetExpandedContent,
		onBuildIds,
		refs,
	} = props;

	const [resizingColumnIndex, onStartResizingColumn] = useState<number | null>(null);
	const [state, setState] = useState<ITableState<T>>({
		// eslint-disable-next-line @typescript-eslint/no-use-before-define
		columns: buildColumns<T>({
			columns,
			onBuildIds,
			addCheckbox: typeof onCheckItems === 'function',
			addExpander: (typeof onExpandItems === 'function' && typeof onGetExpandedContent === 'function' ),
		}),
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

	useEffect(() => {
		setState((prevState) => ({ ...prevState, data: props.data }));
	}, [props.data]);

	useColumnResize({
		columns: state.columns,
		resizingColumnIndex,
		minCellWidth,
		tableBodyRef: refs.body,
		tableHeaderRef: refs.header,
		onStartResizingColumn,
	});

	useScrolling<T>({ refs, state, onUpdateState: setState });

	const { onColumnSorting } = useColumnSorting<T>({ state, onUpdateState: setState });

	const columnsWidths = useMemo(
		() => state.columns.map((col) => (col.width ? col.width : 'auto')),
		[state.columns],
	);

	const handleCheckAll = useCallback(
		({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
			if (!allowCheckAll) return;

			const allItemIds = checked ? state.data.map((item) => item.id) : [];

			if (typeof onCheckItems === 'function') {
				onCheckItems(allItemIds);
			}
		},
		[onCheckItems, state.data],
	);

	const calcPosition = (pos: ColumnStick, collection: ITableColumn[], column: ITableColumn, index: number) => ({
		...column,
		[pos]: index === 0 ? index : collection.slice(0, index).reduce((result, { width }) => result + (width ?? 0), 0),
	});

	const headers = useMemo(() => {
		let left = state.columns.filter(({ fixed }) => fixed === ColumnStick.Left);
		left = left.map((col, index) => calcPosition(ColumnStick.Left, left, col, index));

		const center = state.columns.filter(({ fixed }) => fixed === undefined);

		let right  = [...state.columns].reverse().filter(({ fixed }) => fixed === ColumnStick.Right);
		right = right.map((col, index) => calcPosition(ColumnStick.Right, right, col, index));

		return [...left, ...center, ...right.reverse()];
	}, [state.columns]);

	return {
		headers,
		data: state.data.slice(state.displayStart, state.displayEnd),
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll: handleCheckAll,
		onColumnSorting,
	};
};
