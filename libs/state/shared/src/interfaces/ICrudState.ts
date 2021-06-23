import { QueryOptions } from '@xapp/shared/types';
import { DataContext } from '../DataContext';
import { IStoreState } from './';

type Filters<TFilter = any> = Record<string, TFilter>;

export interface ICrudState<
	TStore extends DataContext<TOutput, TInput> = any,
	TOutput = any,
	TInput = any,
	TFilter = any,
> extends IStoreState<TStore> {
	items: TOutput[];
	filters?: Filters<TFilter>;
	isApiReady?: boolean;
	sortBy?: QueryOptions['sortBy'];
	read(filters?: Filters<TFilter>): Promise<void>;
	save(todo: TInput, id?: number): Promise<void>;
	remove(id: number): Promise<void>;
}
