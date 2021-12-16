import { useLayoutEffect, useEffect, Dispatch, SetStateAction } from 'react';
import { IColumnKey, ITableState, ITableRefsProps } from '../types';

interface IUseScrolling<T extends IColumnKey = any> {
	refs: ITableRefsProps;
	state: ITableState<T>;
	onUpdateState: Dispatch<SetStateAction<ITableState<T>>>;
}

export const useScrolling = <T extends IColumnKey = any>(props: IUseScrolling<T>): void => {
	const { state, refs, onUpdateState } = props;

	function handleScrolling() {
		const verticalScroll = refs.wrapper.current.scrollTop;
		const horizontalScroll = refs.wrapper.current.scrollLeft;

		const visibleStart = Math.floor(verticalScroll / state.rowHeight);
		const visibleEnd = Math.floor(Math.min(visibleStart + state.rowsPerBody, state.total - 1)) + state.rowHeight;
		const displayStart = Math.floor(Math.max(0, Math.floor(verticalScroll / state.rowHeight) - state.rowsPerBody * 1.5));
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
				verticalScroll,
				shouldUpdate: false,
			}));
		}

		if (refs.shadow.top) {
			refs.shadow.top.current.style.display = verticalScroll > 0 ? 'block' : 'none';
		}
		if (refs.shadow.bottom) {
			refs.shadow.bottom.current.style.display = verticalScroll > 0 ? 'block' : 'none';
		}
		if (refs.shadow.left) {
			refs.shadow.left.current.style.display = horizontalScroll > 0 ? 'block' : 'none';
		}
		if (refs.shadow.right) {
			refs.shadow.right.current.style.display = horizontalScroll > 0 ? 'block' : 'none';
		}
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
