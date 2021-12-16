import { DeepPartial } from 'typeorm';

type DeepPartialPrimitive = undefined | null | boolean | string | number | Function;

export type DeepPartialArray<T> = Array<DeepPartial<T>>;
export type DeepPartialMap<K, V> = Map<DeepPartial<K>, DeepPartial<V>>;
export type DeepPartialSet<T> = Set<DeepPartial<T>>;
export type DeepPartialObject<T> = {[K in keyof T]?: DeepPartial<T[K]>};

export type DeepPartial<T> =
	T extends DeepPartialPrimitive ? T :
		T extends Array<infer U> ? DeepPartialArray<U> :
			T extends Map<infer K, infer V> ? DeepPartialMap<K, V> :
				T extends Set<infer M> ? DeepPartialSet<M> : DeepPartialObject<T>;

