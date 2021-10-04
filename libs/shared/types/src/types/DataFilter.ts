import { FieldType } from '../enums';

export type DataFilter = Record<string, { value: any; type: FieldType }>;
