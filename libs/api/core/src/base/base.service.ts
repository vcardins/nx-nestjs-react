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
import { IBaseService, IBaseServiceOptions, IBaseServiceCache, IFindAndCountResult, IPaginationQuery } from './base.interface';
import { IBaseEntity } from './base.entity';
import { IEvent } from '../events/events.interface';
import { plainToClass } from 'class-transformer';

// interface ClassType<T> {
// 	new (): T;
// }

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {
	public withMap: boolean;
	protected queryBuilder?: SelectQueryBuilder<T>;
	private cache: IBaseServiceCache;
	events: IEvent[] = [];

	constructor(
		protected readonly repository: Repository<T>,
		protected readonly mapper: AutoMapper,
		private options: IBaseServiceOptions = {},
	) {
		this.withMap = !!options.mapping;
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

	public async getAllMapped<TOutput extends { id: number }>(preItems?: T[]): Promise<Record<number, TOutput>> {
		const items = preItems || await this.find();
		const outputItems = items.map((item) => plainToClass(this.options.outputModel, item));

		return outputItems.reduce((result, item) => {
			result[item.id] = item;
			return result;
		}, {} as Record<number, TOutput>);
	}

	async create(model: any): Promise<T> {
		try {
			const result = await this.repository.save(model);

			this.afterCreate?.(result);

			return result;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async update<TUpdate = any>(id: IdType, model: TUpdate): Promise<T> {
		try {
			let entity: T;
			entity = await this.repository.findOne(id);
			if (!entity) {
				throw new BadGatewayException('Entity could not be found');
			}

			entity = this.repository.merge(entity, model as TUpdate);

			const result = await this.repository.save(entity as any);

			this.afterUpdate?.(result);

			return result;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async findById(id: IdType, options?: FindOneOptions): Promise<T> {
		try {
			return await this.repository.findOne(id, options);
		}
		catch (error) {
			throw new NotFoundException(error);
		}
	}

	async delete(id: IdType): Promise<DeleteResult> {
		try {
			const result = (await this.repository.delete(this.getId(id))) as DeleteResult;
			this.afterDelete?.(id, result);
			return result;
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
	public async findAndCount(options: IPaginationQuery, relations?: Record<string, string>): Promise<IFindAndCountResult<T> | T[]>{
		const { sortBy, filter, pageNumber, pageSize } = options || {};

		const isPaginated = pageSize > 0 && pageNumber > 0;
		const skip = isPaginated ? pageSize * (pageNumber - 1) : 0;

		let qb = this.queryBuilder || this.createQueryBuilder();

		qb = qb
			.skip(skip)
			.take(pageSize)
			.cache(this.cache.find);

		if (sortBy) {
			Object.keys(sortBy).forEach((direction) => {
				qb.addOrderBy(`${this.modelName}.${direction}`, sortBy[direction]);
			});
		}

		if (filter) {
			qb = qb.where(filter);
		}

		if (relations) {
			Object.keys(relations).forEach((relation) => {
				qb.leftJoinAndSelect(relations[relation], relation);
			});
		}

		if (!isPaginated) {
			return qb.getMany();
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
		this.cache = {
			find: !!cache,
			findById: !!cache,
			findOne: !!cache,
			findAndCount: !!cache,
		};

		if (typeof cache === 'object') {
			this.cache = cache;
		}
	}

	afterCount?(count: number): void;
	afterCreate?(data: any): void;
	afterUpdateOrCreate?(data: any): void;
	afterUpdate?(data: any): void;
	afterDelete?(id: IdType, data: DeleteResult): void;
}
