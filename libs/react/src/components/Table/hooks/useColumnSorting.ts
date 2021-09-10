import { Dispatch, SetStateAction } from 'react';
import { SortDirections } from '@xapp/shared/types';

import { ITableState, IColumnKey } from '../types';

interface IUseColumnSorting<T extends IColumnKey = any> {
	state: ITableState<T>;
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useColumnSorting = <T extends IColumnKey = any>(props: IUseColumnSorting<T>) => {
	const { state, onUpdateState } = props;

	function handleSortColumn(sortIndex: number) {
		const sortKey = state.columns[sortIndex].key;
		let sortDirection: SortDirections;

		const columns = state.columns.map((col, i) => {
			if (i === sortIndex) {
				if (!col.sortDirection || col.sortDirection === SortDirections.DESC) {
					sortDirection = SortDirections.ASC;
				}
				else {
					sortDirection = SortDirections.DESC;
				}
				return { ...col, sortDirection };
			}

			return { ...col, sortDirection: null };
		});

		const updateRows = [...state.data].sort((a, b) => {
			if (a[sortKey] === b[sortKey]) {
				return 0;
			}
			else if (sortDirection === SortDirections.DESC) {
				return a[sortKey] < b[sortKey] ? 1 : -1;
			}
			return a[sortKey] > b[sortKey] ? 1 : -1;
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
