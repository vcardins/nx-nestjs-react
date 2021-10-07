import { useMemo } from 'react';
import { IColumnInfo } from '@xapp/shared/types';

export const useColumnToggle = (columns: IColumnInfo[], showColumnDisplayToggle: boolean) => {
	if (!showColumnDisplayToggle) return null;

	return useMemo(() => {
		const items = columns.filter(({ label }) => !!label).map(({ key, label }) => ({ id: key, value: key, label }));
		let columnsCount: number;

		switch (true) {
			case items?.length < 6: columnsCount = 1; break;
			case items?.length >= 6: columnsCount = 2; break;
			case items?.length >= 15: columnsCount = 3; break;
			default: columnsCount = 4; break;
		}

		return {
			columnsCount,
			items,
			selectedItems: columns.filter(({ hidden }) => !hidden ).map(({ key }) => key),
		};
	}, [columns, showColumnDisplayToggle]);
};
