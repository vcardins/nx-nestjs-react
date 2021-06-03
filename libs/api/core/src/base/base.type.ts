export type IdType = string | number;

export enum SortDirection {
	ASC = 'ASC',
	DESC = 'DESC'
};

export type DefaultOptions = { sortBy: Record<string, SortDirection> };
