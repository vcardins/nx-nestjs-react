import { StoreEventHandlers } from './types/StoreEventHandlers';
import { GetState, SetState } from 'zustand';

import { SortDirections, KeyType, FieldType, IColumnInfo, Operations } from '@xapp/shared/types';

import { ApiCallStatus, IAuthState, ICrudState, setError, setIdle, setLoading, setSubmitting, setSuccess } from '.';
import { DataContext } from './DataContext';

interface Class<TDataContext> {
	new (authHeader: IAuthState['authHeader']): TDataContext;
}

type TStore<TOutput, TInput> = DataContext<TOutput, TInput, TInput & { id: KeyType }>;

export function storeValues(id: KeyType | KeyType[], collection: KeyType[]) {
	// Accept an array as `itemId` to replace whatever the
	// selection is (used to implement check/uncheck-all).
	let value: KeyType | KeyType[];

	if (Array.isArray(id)) {
		value = id;
	}
	// Otherwise proceed to check/uncheck single id.
	else {
		const index = collection.indexOf(id);

		if (index === -1) {
			value = [...collection, id];
		} else {
			value = collection.filter((index) => index !== id);
		}
	}

	return value;
}

const getVisibleColumns = (columns?: IColumnInfo[]) =>
	columns?.filter(({ hidden }) => !hidden )?.map?.(({ key }) => key) ?? []

const columns: IColumnInfo[] = [];

export const updateAfterAction = <
	TState extends ICrudState<TStore<TOutput, TInput>, TOutput, TInput>,
	TInput extends { id?: KeyType } = any,
	TOutput extends { id: KeyType } = any
>(set: SetState<TState>, get: GetState<TState>) =>
	(action: Operations, data: any) => {
		const { items } = get();
		console.log(`Event: ${action}: `, data);

		switch (action) {
			case Operations.Create:
			case Operations.Update:
				const index = items.findIndex(({ id }) => id === data.id);

				set((state) =>
					void (index === -1 ? (state.items = [data, ...items]) : (state.items[index] = data))
				);
				break;
			case Operations.Delete:
				set((state) =>
					void (state.items = items.filter((item) => item.id !== data.id))
				);
				break;
		}
	}

export function createBaseStore<
	TState extends ICrudState<TStore<TOutput, TInput>, TOutput, TInput>,
	TInput extends { id?: KeyType } = any,
	TOutput extends { id: KeyType } = any
>(
	Store: Class<TStore<TOutput, TInput>>,
	initialStateValues?: Partial<TState>,
	extraMethods?: (set: SetState<TState>, get: GetState<TState>) => Partial<TState>
) {
	return (set: SetState<TState>, get: GetState<TState>) => ({
		status: ApiCallStatus.Idle,
		items: [] as TOutput[],
		columns,
		visibleColumns: [],
		filteredItems: null,
		checkedItems: [] as KeyType[],
		expandedItems: [] as KeyType[],
		sortBy: { id: SortDirections.ASC },
		error: null,
		isApiReady: false,
		...initialStateValues,
		store: null,
		async init(props: IAuthState, eventsHandlers?: StoreEventHandlers): Promise<void> {
			return new Promise((resolve) => {
				const { columns, getEventsListeners } = get();
				const visibleColumns = getVisibleColumns(columns);
				const handles = getEventsListeners?.();

				if (handles) {
					Object.keys?.(handles).forEach((key) => eventsHandlers.on(key, handles[key]));
				}

				set({ store: new Store(props.authHeader), visibleColumns, isApiReady: true });
				resolve();
			});
		},
		async read(filters?: TState['filters'], id?: number) {
			const { status, store } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setLoading(set)();

			try {
				const items = await store?.readAll(filters, id);
				setSuccess<TState, { items: TOutput[] }>(set)({ items });
			} catch (error) {
				setError<TState, { items: TOutput[] }>(set)(error, { items: [] });
			}
		},
		async save(model: TInput, id?: KeyType) {
			const { store, status } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setSubmitting(set)();

			try {
				const isNew = !Number.isFinite(id);
				const data = isNew ? { ...model, id: undefined } : model;

				isNew ? await store.create({ data }) : await store.update({ data }, id);

				set((state) =>
					void (
						(state.status = ApiCallStatus.Success),
						(state.error = null)
					)
				);
			} catch (error) {
				setError(set)(error);
			}
		},
		async remove(id: number) {
			const { store, status } = get();

			if (status === ApiCallStatus.Loading) {
				return;
			}

			setSubmitting(set)();

			try {
				await store.delete(null, id);
				setSuccess<TState>(set)();
			} catch (error) {
				setError(set)(error);
			}
		},
		reset() {
			setIdle<TState, { items: TOutput[] }>(set)({ items: [] });
		},
		clearError() {
			set({ error: null });
		},
		setCheckedItems(id: KeyType | KeyType[]) {
			const { checkedItems } = get();
			const values = storeValues(id, checkedItems);

			set({ checkedItems: values });
		},
		setExpandedItems(id: KeyType | KeyType[]) {
			const { checkedItems } = get();
			const values = storeValues(id, checkedItems);

			set({ expandedItems: values });
		},
		async filter(filters: ICrudState['filters']) {
			const { items } = get();
			if (!filters || !Object.keys(filters).length) {
				set({ filteredItems: null });
				return;
			}

			setLoading(set)();

			try {
				const filteredItems = await new Promise<TOutput[]>((resolve) => {
					const response = items.filter((item) =>
						Object.keys(filters)
							.filter((key) => !!filters[key])
							.every((key) => {
								const { type, value } = filters[key];
								switch (type) {
									case FieldType.Text:
										return item[key]?.toLowerCase().indexOf(value.toLowerCase()) > -1;
									case FieldType.Array:
										return Array.isArray(value) ? value.includes(item[key]) : false;
									default:
										return item[key] === value;
								}
							})
					);
					resolve(response);
				});

				setSuccess<TState, { filteredItems: TOutput[] }>(set)({ filteredItems });
			} catch (error) {
				setError<TState, { filteredItems: TOutput[] }>(set)(error, { filteredItems: null });
			}
		},
		toggleColumnVisibility(key: string, visible: boolean) {
			const { columns } = get();
			if (!columns?.length) {
				return;
			}

			try {
				const index = columns.findIndex((col) => col.key === key);
				const updatedColumns = [
					...columns.slice(0, index),
					{ ...columns[index], hidden: !visible },
					...columns.slice(index + 1),
				];

				setSuccess<TState, { columns: IColumnInfo[]; visibleColumns: string[] }>(set)({
					columns: updatedColumns,
					visibleColumns: getVisibleColumns(updatedColumns),
				});
			} catch (error) {
				setError<TState, { columns: IColumnInfo[] }>(set)(error);
			}
		},
		...extraMethods?.(set, get),
	});
}
