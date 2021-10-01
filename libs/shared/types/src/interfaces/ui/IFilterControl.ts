import { IdType } from '@xapp/shared/types';
import { FilterControlType } from '../../enums';

export interface IFilterControlItem {
	key?: string;
	type: FilterControlType;
	label: string;
	options?: { id: IdType; name: string }[];
};
