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

const calcPosition = (pos: ColumnStick, collection: ITableColumn[], column: ITableColumn, index: number): ITableColumn => ({
	...column,
	resizable: false,
	[pos]: index === 0 ? index : collection.slice(0, index).reduce((result, { width }) => result + (width ?? 0), 0),
});

export const useTableManager = <T extends IColumnKey = any>(props: ITableProps<T> & { refs: ITableRefsProps; }) => {
	const {
		columns = [], data = [], allowCheckAll = true, refs, theme,
		onCheckItems, onExpandItems, onGetExpandedContent, onBuildIds,
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
		rowHeight: theme.rowHeight,
		rowsPerBody: theme.rowsPerBody,
		visibleStart: 0,
		visibleEnd: theme.rowsPerBody,
		displayStart: 0,
		displayEnd: theme.rowsPerBody * 2,
		verticalScroll: 0,
		shouldUpdate: false,
	});

	useEffect(() => {
		setState((prevState) => ({ ...prevState, data: props.data }));
	}, [props.data]);

	useColumnResize({
		columns: state.columns,
		resizingColumnIndex,
		minCellWidth: theme.minCellWidth,
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

	const { headers, shadowLeft, shadowRight } = useMemo(() => {
		let left = state.columns.filter(({ fixed }) => fixed === ColumnStick.Left);
		left = left.map((col, index) => calcPosition(ColumnStick.Left, left, col, index));

		const center = state.columns.filter(({ fixed }) => fixed === undefined);

		let right  = [...state.columns].reverse().filter(({ fixed }) => fixed === ColumnStick.Right);
		right = right.map((col, index) => calcPosition(ColumnStick.Right, right, col, index));

		return {
			headers: [...left, ...center, ...right.reverse()],
			shadowLeft: left.reduce((result, { width }) => result + width, 0),
			shadowRight: right.reduce((result, { width }) => result + width, 0),
		};
	}, [state.columns]);

	return {
		headers,
		shadowLeft,
		shadowRight,
		data: state.data.slice(state.displayStart, state.displayEnd),
		columnsWidths,
		state,
		resizingColumnIndex,
		onStartResizingColumn,
		onCheckAll: handleCheckAll,
		onColumnSorting,
	};
};
