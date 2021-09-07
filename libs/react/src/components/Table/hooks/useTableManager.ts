import { useLayoutEffect, useState, useEffect, MutableRefObject } from 'react';
import { ITableProps, ITableState } from '../types';

interface IUseTableManager<T = any> {
	tableRef: MutableRefObject<HTMLDivElement>;
	topShadowRef: MutableRefObject<HTMLDivElement>;
	state: ITableState<T>;
	onUpdateState: typeof useState;
}

export const useTableManager = <T>(props: ITableProps<T>): void => {

};
