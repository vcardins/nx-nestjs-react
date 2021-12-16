import { FindConditions, FindManyOptions, UpdateResult, DeleteResult } from 'typeorm';
import { AutoMapper } from 'nestjsx-automapper';

import { IdType, SortDirections } from '@xapp/shared/types';

export interface IFindAndCountResult<T> {
	data: Partial<T>[];
	total: number;
	totalPages: number;
	pageNumber: number;
}

export interface IBaseControllerFactoryOpts<T> {
	entity: { new (): T };
	entityOutput: { new (): any };
	entityCreateInput?: { new (): any };
	entityUpdateInput?: { new (): any };
}

export interface IPaginationQuery {
	pageSize?: number;
	pageNumber?: number;
	filter?: string;
	sortBy?: Record<string, SortDirections>;
	q?: string;
}

export interface IBaseServiceCache {
	find: boolean;
	findById: boolean;
	findOne: boolean;
	findAndCount: boolean;
}

export interface IBaseServiceOptions {
	cache?: IBaseServiceCache | boolean;
	mapping?: (config: AutoMapper) => void;
	outputModel?: { new (): any };
}

export interface IBaseService<T> {
	find: (f: FindManyOptions<T> & FindConditions<T>) => Promise<T[]>;
	findById: (i: string | number) => Promise<T>;
	findAndCount: (query: IPaginationQuery) => Promise<IFindAndCountResult<T> | T[]>;
	create: (i: any) => Promise<T>;
	update: (id: string | number, i: any) => Promise<T>; // UpdateResult
	delete: (i: string | number) => Promise<{ id: IdType }>;
	count: () => Promise<number>;
	map<S = any, D = any>(o: Partial<T> | Partial<T>[], s: S, d: D): Promise<any>;
	afterCount?(count: number): void;
	afterCreate?(data: any): void;
	afterUpdateOrCreate?(data: any): void;
	afterUpdate?(data: any): void;
	afterDelete?(data: any): void;
}

export interface IBeforeRoot<T = any> {
	beforeRoot: (f: FindManyOptions<T>) => void;
}

export interface IAfterRoot<T = any, F = Partial<T>> {
	afterRoot(f: FindManyOptions<T>, d: T, md?: F): void;
}

export interface IBeforeCount {
	beforeCount(): void;
}

export interface IAfterCount {
	afterCount(c: number): void;
}

export interface IBeforePagination {
	beforePagination(q: IPaginationQuery): void;
}

export interface IAfterPagination<T = any> {
	afterPagination(q: IPaginationQuery, d: IFindAndCountResult<T>, md?: IFindAndCountResult<Partial<T>>): void;
}

export interface IBeforeGetById {
	beforeGetById(i: number | string): void;
}

export interface IAfterGetById<T = any> {
	afterGetById(i: string | number, d: T, md?: Partial<T>): void;
}

export interface IBeforeCreate<VM = any> {
	beforeCreate(v: VM): void;
}

export interface IAfterCreate<T = any, VM = any> {
	afterCreate(v: VM, d: T, md?: Partial<T>): void;
}

export interface IBeforeUpdateOrCreate<VM = any> {
	beforeUpdateOrCreate(v: VM): void;
}

export interface IAfterUpdateOrCreate<T = any, VM = any> {
	afterUpdateOrCreate(v: VM, d: T | UpdateResult, md?: Partial<T> | UpdateResult): void;
}

export interface IBeforeUpdate<VM = any> {
	beforeUpdate(v: VM): void;
}

export interface IAfterUpdate<VM = any> {
	afterUpdate(v: VM, d: UpdateResult): void;
}

export interface IBeforeDelete {
	beforeDelete(i: number | string): void;
}

export interface IAfterDelete {
	afterDelete(i: string | number, d: DeleteResult): void;
}


// Maybe unnecessary, to be analyzed
export interface IBaseController {
	get: (pageNumber: number, pageSize: number, q: string, sortBy: string, rawFilter: string, response: () => ParameterDecorator) => Promise<void>;
	getById: (id: string, response: () => ParameterDecorator) => Promise<void>;
	count: (response: () => ParameterDecorator) => Promise<void>
	create: (body: any, response: () => ParameterDecorator) => Promise<void>
	updateOrCreate: (body: any, response: () => ParameterDecorator) => Promise<void>
	update: (body: any, response: () => ParameterDecorator) => Promise<void>
	delete: (id: IdType, response: () => ParameterDecorator) => Promise<void>
	beforeCount?: () => void;
	afterCount?: (count: number) => Promise<void>;
	beforePagination?: (body: any, data: any) => Promise<void>;
	afterPagination?: (body: any, data: any) => Promise<void>;
	beforeGetById?: (body: any, data: any) => Promise<void>;
	afterGetById?: (body: any, data: any) => Promise<void>;
	beforeCreate?: (body: any, data: any) => Promise<void>;
	afterCreate?: (body: any, data: any) => Promise<void>;
	beforeUpdateOrCreate?: (body: any) => Promise<void>;
	afterUpdateOrCreate?: (body: any, data: any, mappedData?: any) => Promise<void>;
	beforeUpdate?: (body: any, data: any) => Promise<void>;
	afterUpdate?: (body: any, data: any) => Promise<void>;
	beforeDelete?: (id: IdType, data: any) => Promise<void>;
	afterDelete?: (id: IdType, data: any) => Promise<void>;
}
