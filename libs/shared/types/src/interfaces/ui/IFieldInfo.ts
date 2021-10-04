import { FieldType } from '../../enums';
import { IdType } from '../IdType';

export interface IFieldInfo {
	name?: string;
	type: FieldType;
	label: string;
	options?: { id: IdType; name: string }[];
};
