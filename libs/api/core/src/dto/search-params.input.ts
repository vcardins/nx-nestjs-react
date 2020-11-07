export class SearchParamsDto {
	currentPage: number;
	pageSize: number;
	q?: string;
	group?: string;
	module?: number;
	sort?: string;
}
