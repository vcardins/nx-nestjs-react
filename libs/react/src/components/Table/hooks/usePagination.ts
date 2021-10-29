import { useMemo, useState} from 'react';
import { PaginationMode } from '@xapp/shared/types';

export const usePagination = <T>(mode: PaginationMode, data: T[], pageSize: number) => {
	const isPaginated = mode === PaginationMode.Pagination;
	const [currentPage, setCurrentPage] = useState(1);
	const baseProps = {
		isPaginated,
		total: data.length,
		currentPage,
		pageSize,
		onPageChange: setCurrentPage,
	};

	return useMemo(() => {
		if (!isPaginated) {
			return {
				...baseProps,
				data,
			};
		}

		const firstPageIndex = (currentPage - 1) * pageSize;
		const lastPageIndex = firstPageIndex + pageSize;

		return {
			...baseProps,
			data: data.slice(firstPageIndex, lastPageIndex),
		};
	}, [currentPage, data, mode, pageSize]);
};
