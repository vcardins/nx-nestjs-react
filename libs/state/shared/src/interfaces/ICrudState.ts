import { QueryOptions, DataFilter } from '@xapp/shared/types';
import { DataContext } from '../DataContext';
import { IStoreState } from './';

export interface ICrudState<
	TStore extends DataContext<TOutput, TInput> = any,
	TOutput = any,
	TInput = any,
> extends IStoreState<TStore> {
	items: TOutput[];
	filteredItems?: TOutput[] | null;
	filters?: DataFilter;
	isApiReady?: boolean;
	sortBy?: QueryOptions['sortBy'];
	read(filters?: DataFilter, id?: number): Promise<void>;
	save(data: TInput, id?: number): Promise<void>;
	remove(id: number): Promise<void>;
	filter?(filters?: DataFilter): Promise<void>;
}
