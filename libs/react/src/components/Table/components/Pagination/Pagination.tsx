// https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import React from 'react';

import { usePagination } from './usePagination';
import { PaginatorDropdown } from './PaginatorDropdown';
import { PaginatorInline } from './PaginatorInline';
import { IUsePaginationProps, PaginationDisplayType } from './types';

export interface IPaginationProps extends IUsePaginationProps {
	displayType?: PaginationDisplayType;
	onPageChange: (page: number) => void;
}

export const Pagination = (props: IPaginationProps) => {
	const { displayType, onPageChange, currentPage } = props;

	const paginationRange = usePagination(props);

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const lastPage = paginationRange[paginationRange.length - 1];

	const paginatorProps = {
		currentPage, paginationRange, lastPage,
		onGoToPage: (page: number) => onPageChange(page),
		onGoFirst: () => currentPage > 1 ? onPageChange(1) : undefined,
		onGoPrevious: () => currentPage > 1 ? onPageChange(currentPage - 1) : undefined,
		onGoNext: () => currentPage < lastPage ? onPageChange(currentPage + 1) : undefined,
		onGoLast: () => currentPage < lastPage ? onPageChange(lastPage) : undefined,
	};

	return displayType === PaginationDisplayType.Dropdown
		? <PaginatorDropdown {...paginatorProps}/>
		: <PaginatorInline {...paginatorProps}/>;
};
