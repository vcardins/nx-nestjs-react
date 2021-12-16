import { Dispatch, SetStateAction } from 'react';
import { IColumnInfo, SortDirections } from '@xapp/shared/types';

import { ITableState, IColumnKey } from '../types';

interface IUseColumnSorting<T extends IColumnKey = any> {
	columns: IColumnInfo[];
	data: T[];
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useColumnSorting = <T extends IColumnKey = any>(props: IUseColumnSorting<T>) => {
	const { columns, data, onUpdateState } = props;

	function handleSortColumn(sortIndex: number) {
		const sortKey = columns[sortIndex].key;
		let sortDirection: SortDirections;

		const updatedColumns = columns.map((col, i) => {
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

		const updateRows = [...data].sort((a, b) => {
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
			columns: updatedColumns,
			shouldUpdate: true,
		}));
	}

	return {
		onColumnSorting: handleSortColumn,
	};
};
