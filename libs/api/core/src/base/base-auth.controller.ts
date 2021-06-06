/* eslint-disable sonarjs/cognitive-complexity */
import {
	Body,
	Delete,
	Get,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
	Put,
	Query,
	Response,
	Req,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiQuery,
	ApiParam,
	ApiBody,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiBearerAuth,
} from '@nestjs/swagger';

import { ModuleAction } from '@xapp/shared/types';
import { getOperationId } from '@xapp/shared/utils';

import { IBaseAuthControllerFactoryOpts } from './base-auth.interface';
import { getAuthObj } from './base-auth.utils';
import { formatEntityName } from './base.utils';
import { filterMetadata } from '../utils/filter-metadata-factory';
import { BaseService } from './base.service';
import { SocketGateway } from '../socket/socket.gateway';
import { Roles } from '../decorators/roles.decorator';
import { Permissions } from '../decorators/permissions.decorator';
import { ApiException } from '../dto/api-exception.dto';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { IPaginationQuery, IFindAndCountResult } from './base.interface';
import { IdType, SortDirection, DefaultOptions } from './base.type';
import { BaseEntity } from './base.entity';

const metadataKey = 'swagger/apiModelPropertiesArray';
const excludedCreateMetadata = [':id', ':createdAt', ':updatedAt'];
const excludedUpdateMetadata = [':createdAt', ':updatedAt'];

export function baseAuthControllerFactory<T extends BaseEntity>(options: IBaseAuthControllerFactoryOpts<T>) {
	const Entity = options.entity;
	const EntityOutput = options.entityOutput;
	const createEntityName: string = options.entityCreateInput?.name || formatEntityName(EntityOutput);
	const updateEntityName: string = options.entityUpdateInput?.name || formatEntityName(EntityOutput, false);
	const EntityCreateInput =
		options.entityCreateInput || filterMetadata(EntityOutput, metadataKey, excludedCreateMetadata, createEntityName);
	const EntityUpdateInput =
		options.entityUpdateInput || filterMetadata(EntityOutput, metadataKey, excludedUpdateMetadata, updateEntityName);
	const auth = getAuthObj(options.auth);

	class EntityCreateInputT extends EntityCreateInput {}
	class EntityUpdateInputT extends EntityUpdateInput {}

	Object.defineProperty(EntityCreateInputT, 'name', {
		value: EntityCreateInput.name,
	});
	Object.defineProperty(EntityUpdateInputT, 'name', {
		value: EntityUpdateInput.name,
	});

	// tslint:disable-next-line: max-classes-per-file
	@ApiTags(Entity.name)
	@ApiBearerAuth() //
	abstract class BaseAuthController {
		protected readonly _service: BaseService<T>;
		protected readonly _socket: SocketGateway;
		protected readonly _defaultOptions: DefaultOptions;

		constructor(service: BaseService<T>, socketGateway?: SocketGateway, defaultOptions?: DefaultOptions ) {
			/* eslint-disable immutable/no-mutation */
			this._service = service;
			this._socket = socketGateway;
			this._defaultOptions = defaultOptions;
			/* eslint-enable immutable/no-mutation */
		}

		emit(event: ModuleAction, data?: any) {
			this._socket?.server.emit('events', { module: Entity.name, event, data });
		}

		@Get('count')
		@Roles(...auth?.count?.roles)
		@Permissions(...auth?.count?.permissions)
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'Count'))
		public async count(@Response() response) {
			try {
				if (this.beforeCount) {
					await this.beforeCount();
				}

				const count = await this._service.count();

				response.send({ count });

				if (this.afterCount) {
					this.afterCount(count);
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Get() // 'pagination'
		@Roles(...auth?.get?.roles)
		@Permissions(...auth?.get?.permissions)
		@ApiQuery({
			name: 'pageSize',
			description: 'Page size',
			required: false,
			isArray: false,
		})
		@ApiQuery({
			name: 'pageNumber',
			description: 'Page number',
			required: false,
			isArray: false,
		})
		@ApiQuery({
			name: 'sortBy',
			required: false,
			type: String,
			description: 'Column name for sort (default: -id)',
		})
		@ApiQuery({
			name: 'filter',
			description: 'TypeORM find query',
			required: false,
			isArray: false,
		})
		@ApiQuery({
			name: 'q',
			required: false,
			type: String,
			description: 'Text for search (default: empty)',
		})
		@ApiOkResponse({
			type: EntityOutput,
			isArray: true,
		})
		@ApiBadRequestResponse({ type: ApiException })
		public async get(@Req() req,
			@Query('pageNumber', new ParseIntWithDefaultPipe(-1)) pageNumber: number = 0,
			@Query('pageSize', new ParseIntWithDefaultPipe(-1)) pageSize: number = 0,
			@Query('q') q?: string,
			@Query('sortBy') sortBy?: string,
			@Query('filter') rawFilter?: string,
			@Response() response?,
		) {
			try {
				const query: IPaginationQuery = {
					pageNumber,
					pageSize,
					q,
					sortBy: sortBy ? { [sortBy]: SortDirection.ASC } : (this._defaultOptions.sortBy ?? { id: SortDirection.ASC }),
					filter: rawFilter,
				};
				const filter = query.filter ? JSON.parse(query.filter) : {};

				if (this.beforePagination) {
					await this.beforePagination(filter);
				}

				const isPaginated = pageSize > 0 && pageNumber > 0;

				const result = await this._service.findAndCount({...query, filter });

				if (!isPaginated) {
					return response.send(result);
				}

				const { data, total } = result as IFindAndCountResult<T>;

				if (this._service.withMap) {
					const mappedData = await Promise.all(data.map((item) => this._service.map(item)));

					response.send({
						data: mappedData,
						total,
					});

					if (this.afterPagination) {
						this.afterPagination(
							filter,
							{ data, total },
							{ data: mappedData, total },
						);
					}
				}
				else {
					response.send({ data, total });

					if (this.afterPagination) {
						this.afterPagination(query, { data, total });
					}
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Get(':id')
		@Roles(...auth?.getById?.roles)
		@Permissions(...auth?.getById?.permissions)
		@ApiParam({
			name: 'id',
			description: 'The ID of the entity to find',
			required: true,
		})
		@ApiOkResponse({ type: EntityOutput })
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'FindById'))
		public async getById(@Param('id') id: string | number, @Response() response) {
			try {
				if (this.beforeGetById) {
					await this.beforeGetById(id);
				}

				const data = await this._service.findById(id);

				if (this._service.withMap) {
					const mappedData = await this._service.map(data);

					response.send(mappedData);

					if (this.afterGetById) {
						this.afterGetById(id, data, mappedData);
					}
				}
				else {
					response.send(data);

					if (this.afterGetById) {
						this.afterGetById(id, data);
					}
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Post()
		@Roles(...auth?.create?.roles)
		@Permissions(...auth?.create?.permissions)
		@ApiBody({
			type: EntityCreateInputT,
			description: 'Data for entity creation',
			required: true,
			isArray: false,
		})
		@ApiCreatedResponse({ type: EntityOutput })
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'Create'))
		public async create(@Req() req, @Body() body: EntityCreateInputT, @Response() response) {
			try {
				if (this.beforeCreate) {
					await this.beforeCreate(body);
				}

				const data = await this._service.create(body as any);

				if (this._service.withMap) {
					const mappedData = await this._service.map(data);

					response.send(mappedData);

					if (this.afterCreate) {
						this.afterCreate(body, data, mappedData);
					}
				}
				else {
					response.send(data);

					if (this.afterCreate) {
						this.afterCreate(body, data);
					}
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Put()
		@Roles(...auth?.updateOrCreate?.roles)
		@Permissions(...auth?.updateOrCreate?.permissions)
		@ApiBody({
			type: EntityUpdateInputT,
			description: 'Data for entity update or create',
			required: true,
			isArray: false,
		})
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'UpdateOrCreate'))
		public async updateOrCreate(@Body() body: EntityUpdateInputT, @Response() response) {
			const entity = await this._service.findById(body.id);

			if (!entity) {
				try {
					if (this.beforeUpdateOrCreate) {
						await this.beforeUpdateOrCreate(body);
					}

					const data = await this._service.create(body as any);

					if (this._service.withMap) {
						const mappedData = await this._service.map(data);

						response.send(mappedData);

						if (this.afterUpdateOrCreate) {
							this.afterUpdateOrCreate(body, data, mappedData);
						}
					}
					else {
						response.send(data);

						if (this.afterUpdateOrCreate) {
							this.afterUpdateOrCreate(body, data);
						}
					}
				}
				catch (e) {
					throw new InternalServerErrorException(e);
				}
			}
			else {
				try {
					if (this.beforeUpdateOrCreate) {
						await this.beforeUpdateOrCreate(body);
					}

					const data = await this._service.update(body.id, body as any);

					response.send(data);

					if (this.afterUpdateOrCreate) {
						this.afterUpdateOrCreate(body, data);
					}
				}
				catch (e) {
					throw new InternalServerErrorException(e);
				}
			}
		}

		@Patch()
		@Roles(...auth?.update?.roles)
		@Permissions(...auth?.update?.permissions)
		@ApiBody({
			type: EntityUpdateInputT,
			description: 'Data for entity update',
			required: true,
			isArray: false,
		})
		@ApiOkResponse({ type: EntityOutput })
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'Update'))
		public async update(@Body() body: EntityUpdateInputT, @Response() response) {
			try {
				if (this.beforeUpdate) {
					await this.beforeUpdate(body);
				}

				const data = await this._service.update(body.id, body as any);

				response.send(data);

				if (this.afterUpdate) {
					this.afterUpdate(body, data);
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Delete(':id')
		@Roles(...auth?.delete?.roles)
		@Permissions(...auth?.delete?.permissions)
		@ApiParam({
			name: 'id',
			description: 'The ID of the entity to delete',
			required: true,
		})
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'Delete'))
		public async delete(@Param('id') id: IdType, @Response() response) {
			try {
				if (this.beforeDelete) {
					await this.beforeDelete(id);
				}

				const data = await this._service.delete(id);

				response.send(data);

				if (this.afterDelete) {
					this.afterDelete(id, data);
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		protected beforeCount?(): Promise<void>
		protected afterCount?(count: number): Promise<void>
		protected beforePagination?(filter: any): Promise<void>
		protected afterPagination?(filter: any, data: { data: any, total: number }, mappedData?: { data: any, total: number }): Promise<void>
		protected beforeGetById?(id: IdType): Promise<void>
		protected afterGetById?(id: IdType, data: any, mappedData?: any): Promise<void>
		protected beforeCreate?(body: any): Promise<void>
		protected afterCreate?(body: any, data: any, mappedData?: any): Promise<void>
		protected beforeUpdateOrCreate?(body: any): Promise<void>
		protected afterUpdateOrCreate?(body: any, data: any, mappedData?: any): Promise<void>
		protected beforeUpdate?(body: any): Promise<void>
		protected afterUpdate?(body: any, data: any): Promise<void>
		protected beforeDelete?(id: IdType): Promise<void>
		protected afterDelete?(id: IdType, data: any): Promise<void>
	}

	return BaseAuthController;
}
