import { useMemo } from 'react';
import { IColumnHeader } from '@xapp/shared/types';

export const useColumnToggle = (columns: IColumnHeader[], showColumnDisplayToggle: boolean) => {
	if (!showColumnDisplayToggle) return null;

	return useMemo(() => {
		const options = columns.filter(({ label }) => !!label).map(({ key, label }) => ({ id: key, value: key, label }));
		let columnsDisplay: number;

		switch(true) {
			case options?.length < 6: columnsDisplay = 1; break;
			case options?.length >= 6: columnsDisplay = 2; break;
			case options?.length >= 15: columnsDisplay = 3; break;
			default: columnsDisplay = 4; break;
		}

		return {
			columnsDisplay,
			options,
			selectedItems: columns.filter(({ hidden }) => !hidden ).map(({ key }) => key),
		};
	}, [columns, showColumnDisplayToggle]);
}
