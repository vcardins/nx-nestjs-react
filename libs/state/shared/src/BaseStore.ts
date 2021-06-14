import { SortDirections } from '@xapp/shared/types';
import { GetState, SetState } from 'zustand';
import { ApiCallStatus, IAuthState, ICrudState, setError, setIdle, setLoading, setSuccess } from '.';
import { DataContext } from './DataContext';

interface Class<TDataContext> {
	new(authHeader: IAuthState['authHeader']): TDataContext;
}

type TStore<TOutput, TInput, TFilter> = DataContext<TOutput, TInput, TInput & { id: number }, TFilter>;

export function createBaseStore<
	TState extends ICrudState<TStore<TOutput, TInput, TState['filters']>, TOutput, TInput, TState['filters']>,
	TInput = any,
	TOutput extends { id: number } = any,
>(
	Store: Class<TStore<TOutput, TInput, TState['filters']>>,
	initialStateValues?: Partial<TState>,
	extraMethods?: (set: SetState<TState>, get: GetState<TState>) => Partial<TState>,
) {
	return (set: SetState<TState>, get: GetState<TState>) => ({
		status: ApiCallStatus.Idle,
		items: [] as TOutput[],
		sortBy: { id: SortDirections.ASC },
		...initialStateValues,
		error: null,
		store: null,
		init(props: IAuthState) {
			set({ store: new Store(props.authHeader) });
		},
		async read(filters?: TState['filters']) {
			const { status, store } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				const items = await store.readAll(filters);

				setSuccess<TState, { items: TOutput[] }>(set)({ items });
			}
			catch (error) {
				setError<TState, { items: TOutput[] }>(set)(error, { items: [] });
			}
		},
		async save(data: TInput, id?: number) {
			const { store, status, items } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				const item = !id
					? await store.create({ data })
					: await store.update({ data: { id, ...data } });

				const index = items.findIndex(({ id }) => id === item.id);

				set((state) => void (
					index === -1
						? (state.items = [item, ...items])
						: (state.items[index] = item),
					(state.status = ApiCallStatus.Success),
					(state.error = null)
				));
			}
			catch (error) {
				setError(set)(error);
			}
		},
		async remove(id: number) {
			const { store, status, items } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				await store.delete(id);
				setSuccess<TState, { items: TOutput[] }>(set)({ items: items.filter((item) => item.id !== id) });
			}
			catch (error) {
				setError(set)(error);
			}
		},
		reset() {
			setIdle<TState, { items: TOutput[] }>(set)({ items: [] });
		},
		...extraMethods(set, get),
	});
}
