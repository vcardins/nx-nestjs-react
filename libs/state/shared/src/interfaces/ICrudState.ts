import { IStoreState } from './';

type Filters<TFilter = any> = Record<string, TFilter>;

export interface ICrudState<TStore = any, TOutput = any, TInput = any, TFilter = any> extends IStoreState<TStore> {
	items: TOutput[];
	filters?: Filters<TFilter>;
	orderBy: Record<string, 'asc' | 'desc'>;
	read(filters?: Filters<TFilter>): Promise<void>;
	save(todo: TInput, id?: number): Promise<void>;
	remove(id: number): Promise<void>;
}
