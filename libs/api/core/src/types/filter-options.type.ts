import { FindManyOptions, FindConditions } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

export type FindManyFilter<T> = T extends BaseEntity
	? FindManyOptions<T> & FindConditions<T>
	: any;
export type FindOneFilter<T> = T extends BaseEntity
	? FindConditions<T>
	: any;
