import { BadGatewayException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, FindOneOptions, SelectQueryBuilder, DeleteResult, /*UpdateResult,*/ FindConditions, FindManyOptions } from 'typeorm';
import { AutoMapper } from 'nestjsx-automapper';

import { IPaginationQuery } from './base.interface';
import { IdType, SortDirection } from './base.type';
import { IBaseService, IBaseServiceOptions, IBaseServiceCache, IFindAndCountResult } from './base.interface';
import { BaseEntity } from './base.entity';

export abstract class BaseService<T extends BaseEntity> implements IBaseService<T> {
	public withMap: boolean;
	private readonly mapping: (config: AutoMapper) => void;
	protected readonly mapper: AutoMapper;
	protected queryBuilder?: SelectQueryBuilder<T>;
	private cache: IBaseServiceCache;

	constructor(protected readonly repository: Repository<T>, mapper: AutoMapper, options: IBaseServiceOptions = {}) {
		/* eslint-disable immutable/no-mutation */
		this.withMap = !!options.mapping;
		this.mapping = options.mapping;
		this.mapper = mapper;
		/* eslint-enable immutable/no-mutation */

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

			return await this.repository.save(entity as any) as T;
		}
		catch (error) {
			throw new BadGatewayException(error);
		}
	}

	async findById(id: IdType, options?: FindOneOptions): Promise<T> {
		try {
			let qb = this.queryBuilder || this.createQueryBuilder();
			qb = qb.where(`${this.modelName}.id = :id`, { id, ...options });

			return await qb.getOne();
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
		const { sortBy, filter, pageNumber, pageSize } = options;

		const isPaginated = pageSize > 0 && pageNumber > 0;
		const skip = isPaginated
			? pageSize * (pageNumber - 1)
			: 0;

		let qb = this.queryBuilder || this.createQueryBuilder();;

		// eslint-disable-next-line immutable/no-mutation
		qb = qb
			.skip(skip)
			.take(pageSize)
			.cache(this.cache.find);

		if (sortBy) {
			const parts = sortBy.split('-');
			let direction: SortDirection = 'ASC';
			let field = parts[0];

			if (parts.length > 1) {
				direction = 'DESC';
				field = parts[1];
			}

			// eslint-disable-next-line immutable/no-mutation
			qb = qb.orderBy(`${this.modelName}.${field}`, direction);
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
