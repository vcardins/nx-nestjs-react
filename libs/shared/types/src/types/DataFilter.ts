import { FilterControlType } from '../enums';

export type DataFilter = Record<string, { value: any; type: FilterControlType }>;
