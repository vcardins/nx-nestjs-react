import { Dispatch, SetStateAction } from 'react';
import { SortDirections } from '@xapp/shared/types';

import { ITableState, IColumnKey } from '../types';

interface IUseColumnSorting<T extends IColumnKey = any> {
	state: ITableState<T>;
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useColumnSorting = <T extends IColumnKey = any>(props: IUseColumnSorting<T>) => {
	const { state, onUpdateState } = props;

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

		const updateRows = [...state.data].sort((a, b) => {
			if (a[sortIndex] === b[sortIndex]) {
				return 0;
			}
			else if (sortOrder === SortDirections.DESC) {
				return a[sortIndex] < b[sortIndex] ? 1 : -1;
			}
			return a[sortIndex] > b[sortIndex] ? 1 : -1;
		});

		onUpdateState((prevState) => ({
			...prevState,
			data: updateRows,
			columns,
			shouldUpdate: true,
		}));
	}

	return {
		onColumnSorting: handleSortColumn,
	};
};
