
export const DOTS = -1; // '...';

export enum PaginationDisplayType {
	Inline = 0,
	Dropdown = 1,
}

export interface IUsePaginationProps {
	totalCount: number;
	pageSize: number;
	siblingCount?: number;
	currentPage: number;
}

export interface IPaginatorProps {
	paginationRange: number[];
	currentPage: number;
	lastPage: number;
	onGoToPage: (page: number) => void;
	onGoFirst: () => void;
	onGoPrevious: () => void;
	onGoNext: () => void;
	onGoLast: () => void;
}
