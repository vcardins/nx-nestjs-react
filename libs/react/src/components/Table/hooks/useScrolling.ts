import { useLayoutEffect, useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { IColumnKey, ITableState, ITableRefsProps } from '../types';

interface IUseScrolling<T extends IColumnKey = any> {
	refs: ITableRefsProps;
	state: ITableState<T>;
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useScrolling = <T extends IColumnKey = any>(props: IUseScrolling<T>): void => {
	const { state, refs, onUpdateState } = props;

	function handleScrolling() {
		const scroll = refs.wrapper.current.scrollTop;
		const visibleStart = Math.floor(scroll / state.rowHeight);
		const visibleEnd = Math.floor(Math.min(visibleStart + state.rowsPerBody, state.total - 1)) + state.rowHeight;
		const displayStart = Math.floor(Math.max(0, Math.floor(scroll / state.rowHeight) - state.rowsPerBody * 1.5));
		const displayEnd = Math.floor(Math.min(displayStart + 4 * state.rowsPerBody, state.total - 1)) + state.rowHeight;

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

		refs.topShadow.current.style.display = scroll > 0 ? 'block' : 'none';
	}

	useEffect(() => {
		window.requestAnimationFrame(() => {
			if (refs.body.current && state.data?.length) {
				const firstTableCell = refs.body.current.querySelector<HTMLDivElement>('[role="td"]');
				const rowHeight = Math.floor(firstTableCell?.offsetHeight || 0);

				const contentHeight = Math.floor(refs.body.current.offsetHeight);
				const rowsPerBody = Math.floor(contentHeight / rowHeight);

				onUpdateState((prevState) => ({
					...prevState,
					rowHeight: rowHeight < 1 ? 25 : rowHeight,
					rowsPerBody,
					visibleStart: 0,
					visibleEnd: rowsPerBody,
					displayStart: 0,
					displayEnd: rowsPerBody * 4,
				}));
			}
		});
	}, [refs.body.current, state.data]);

	useLayoutEffect(() => {
		refs.wrapper.current?.addEventListener('scroll', handleScrolling, false);

		return () => {
			refs.wrapper.current?.removeEventListener('scroll', handleScrolling);
		};
	}, []);
};
