import { useCallback, useEffect, CSSProperties } from 'react';

import { IColumnInfo } from '@xapp/shared/types';
import { ITableRefsProps } from '../types';

const handleTextSelection = (isMouseMoving = false) =>
	document.body.style.userSelect = isMouseMoving ? 'none' : 'auto';

interface IUseColumnResize {
	columns: IColumnInfo[];
	refs: ITableRefsProps;
	minCellWidth: CSSProperties['width'];
	resizingColumnIndex: number;
	onStartResizingColumn: (index: number) => void;
}

export const useColumnResize = (props: IUseColumnResize): void => {
	const { columns, resizingColumnIndex, minCellWidth, refs, onStartResizingColumn } = props;
	const handleMouseDown = (index: number) => onStartResizingColumn(index);

	const handleMouseMove = useCallback((e: MouseEvent) =>
		requestAnimationFrame(() => {
			if (resizingColumnIndex === null) return;

			handleTextSelection(true);
			// Get the bounding rectangle of target
			const column = columns[resizingColumnIndex].forwardRef.current;
			const rect = column.getBoundingClientRect();
			const width = e.clientX - rect.left;

			const gridColumns = columns.map((col, i) => {
				let updatedWidth = i !== resizingColumnIndex ? (col.width || 'auto') : width;
				if (updatedWidth < minCellWidth) {
					updatedWidth = minCellWidth;
				}
				return typeof updatedWidth === 'string' ? updatedWidth : `${updatedWidth}px`;
			});

			const gridColumnsSizes = `${gridColumns.join(' ')}`;
			refs.header.current.style.gridTemplateColumns = gridColumnsSizes;

			Array.from(refs.body.current.childNodes).forEach((e) => {
				(e as any).style.gridTemplateColumns = gridColumnsSizes;
			});
		}),
	[resizingColumnIndex, columns, minCellWidth],
	);

	const removeListeners = useCallback(() => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', removeListeners);
	}, [handleMouseDown]);

	const handleMouseUp = useCallback(() => {
		onStartResizingColumn(null);
		removeListeners();
		handleTextSelection(false);
	}, [onStartResizingColumn, removeListeners]);

	useEffect(() => {
		if (resizingColumnIndex !== null) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			removeListeners();
		};
	}, [
		resizingColumnIndex,
		handleMouseMove,
		handleMouseUp,
		removeListeners,
	]);
};
