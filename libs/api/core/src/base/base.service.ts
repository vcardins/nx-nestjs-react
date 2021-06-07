import { BadGatewayException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import {
	Repository,
	FindOneOptions,
	SelectQueryBuilder,
	DeleteResult,
	/*UpdateResult,*/ FindConditions,
	FindManyOptions,
} from 'typeorm';
import { AutoMapper } from 'nestjsx-automapper';

import { IdType } from '@xapp/shared/types';
import { IPaginationQuery } from './base.interface';
import { IBaseService, IBaseServiceOptions, IBaseServiceCache, IFindAndCountResult } from './base.interface';
import { BaseEntity } from './base.entity';
import { IEvent } from '../events/events.interface';

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
	public withMap: boolean;
	private readonly mapping: (config: AutoMapper) => void;
	protected readonly mapper: AutoMapper;
	protected queryBuilder?: SelectQueryBuilder<T>;
	private cache: IBaseServiceCache;
	events: IEvent[] = []

	constructor(protected readonly repository: Repository<T>, mapper: AutoMapper, options: IBaseServiceOptions = {}) {
		this.withMap = !!options.mapping;
		this.mapping = options.mapping;
		this.mapper = mapper;

		this.cacheConfig(options.cache);

		Logger.log('Im the ORM Service');
	}
	public async find(filter: FindManyOptions<T> & FindConditions<T> = {}): Promise<T[]> {
		return this.repository.find(filter);
	}

	public async findOne(filter: FindManyOptions<T> & FindConditions<T> = {}): Promise<T> {
		return this.repository.findOne(filter);
	}

	createQueryBuilder() {
		return this.repository.createQueryBuilder(this.modelName);
	}

	async create(model: any): Promise<T> {
		try {
			return await this.repository.save(model);
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async update(id: IdType, model: any, checkIfExist = true): Promise<T> {
		try {
			let entity: T;
			if (checkIfExist) {
				entity = await this.repository.findOne(id);
				if (!entity) {
					throw new BadGatewayException('Entity could not be found');
				}
			}
			else {
				entity = model;
			}

			entity = this.repository.merge(entity, model as any);

			return (await this.repository.save(entity as any)) as T;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async findById(id: IdType, options?: FindOneOptions): Promise<T> {
		try {
			return this.repository.findOne(id, options);
		}
		catch (error) {
			throw new NotFoundException(error);
		}
	}

	async delete(id: IdType): Promise<DeleteResult> {
		try {
			return (await this.repository.delete(this.getId(id))) as DeleteResult;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	private getId(id: IdType): number {
		const parseId = Number(id);

		if (isNaN(parseId)) {
			throw new BadRequestException('Invalid Id');
		}

		return parseId;
	}

	public async count(): Promise<number> {
		return this.repository.count();
	}

	// ps: number, pn: number, filter: FindManyOptions<T>
	public async findAndCount(options: IPaginationQuery = {}): Promise<IFindAndCountResult<T> | T[]>{
		const { sortBy, filter, pageNumber, pageSize } = options || {};

		const isPaginated = pageSize > 0 && pageNumber > 0;
		const skip = isPaginated ? pageSize * (pageNumber - 1) : 0;

		let qb = this.queryBuilder || this.createQueryBuilder();

		qb = qb.skip(skip).take(pageSize).cache(this.cache.find);

		if (sortBy) {
			Object.keys(sortBy).forEach((direction) => {
				qb.addOrderBy(`${this.modelName}.${direction}`, sortBy[direction]);
			});
		}

		if (filter) {
			qb = qb.where(filter);
		}

		if (!isPaginated) {
			return await qb.getMany();
		}

		const [data, total] = await qb.getManyAndCount();

		return {
			data,
			total,
			totalPages: pageSize > total ? 1 : Math.ceil(total / pageSize),

			pageNumber,
		};
	}
	public async map(object: T | Partial<T>): Promise<Partial<T>> {
		return this.mapper.map(this.modelName, object as any);
	}

	protected get modelName(): string {
		const target: any = this.repository.target;

		return target.name;
	}

	private cacheConfig(cache: IBaseServiceCache | boolean): void {
		if (!cache) {
			// eslint-disable-next-line immutable/no-mutation
			this.cache = {
				find: false,
				findById: false,
				findOne: false,
				findAndCount: false,
			};
		}

		if (cache === true) {
			// eslint-disable-next-line immutable/no-mutation
			this.cache = {
				find: true,
				findById: true,
				findOne: true,
				findAndCount: true,
			};
		}

		if (typeof cache === 'object') {
			// eslint-disable-next-line immutable/no-mutation
			this.cache = cache;
		}
	}
}
