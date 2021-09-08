import { useLayoutEffect, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { IColumnKey, ITableState } from '../types';

interface IUseScrolling<T extends IColumnKey = any> {
	tableRef: MutableRefObject<HTMLDivElement>;
	topShadowRef: MutableRefObject<HTMLDivElement>;
	state: ITableState<T>;
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useScrolling = <T extends IColumnKey = any>(props: IUseScrolling<T>): void => {
	const { state, topShadowRef, tableRef, onUpdateState } = props;

	function handleScrolling() {
		const scroll = tableRef.current.scrollTop;
		const visibleStart = Math.floor(scroll / state.rowHeight);
		const visibleEnd = Math.floor(Math.min(visibleStart + state.rowsPerBody, state.total - 1)) + state.rowHeight;
		const displayStart = Math.floor(Math.max(0, Math.floor(scroll / state.rowHeight) - state.rowsPerBody * 1.5));
		const displayEnd =
			Math.floor(Math.min(displayStart + 4 * state.rowsPerBody, state.total - 1)) + state.rowHeight;
		if (
			state.shouldUpdate ||
			!(visibleStart >= state.displayStart && visibleEnd + state.rowsPerBody <= state.displayEnd)
		) {
			onUpdateState((prevState) => ({
				...prevState,
				visibleStart,
				visibleEnd,
				displayStart,
				displayEnd,
				scroll,
				shouldUpdate: false,
			}));
		}

		topShadowRef.current.style.display = scroll > 0 ? 'block' : 'none';
	}

	useEffect(() => {
		window.requestAnimationFrame(() => {
			if (tableRef.current) {
				const rowHeight = Math.floor(
					tableRef.current.querySelector<HTMLDivElement>('[role=tablecell]').offsetHeight,
				);
				const contentHeight = Math.floor(tableRef.current.offsetHeight);
				const rowsPerBody = Math.floor(contentHeight / rowHeight);

				onUpdateState((prevState) => ({
					...prevState,
					rowHeight: rowHeight < 1 ? 30 : rowHeight,
					rowsPerBody,
					visibleStart: 0,
					visibleEnd: rowsPerBody,
					displayStart: 0,
					displayEnd: rowsPerBody * 4,
				}));
			}
		});
	}, [tableRef.current]);

	useLayoutEffect(() => {
		tableRef.current?.addEventListener('scroll', handleScrolling, false);

		return () => {
			tableRef.current?.removeEventListener('scroll', handleScrolling);
		};
	}, []);
};
