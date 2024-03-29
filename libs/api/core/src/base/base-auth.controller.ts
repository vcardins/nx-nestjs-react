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
	// import { TransformInterceptor } from '../decorators';
	// UseInterceptors, @UseInterceptors(new TransformInterceptor(EntityOutput)) // It causing the server to blow, investigate
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
} from '@nestjs/swagger';

import { Operations, UserRoles, IdType, SortDirections, QueryOptions } from '@xapp/shared/types';
import { getOperationId } from '@xapp/shared/utils';

import { AuthConstraint, IBaseAuthControllerFactoryOpts } from './base-auth.interface';
import { getAuthConstraints } from './base-auth.utils';
import { formatEntityName } from './base.utils';
import { filterMetadata } from '../utils/filter-metadata-factory';
import { BaseService } from './base.service';
import { SocketGateway } from '../socket/socket.gateway';
import { Roles } from '../decorators/roles.decorator';
import { Permissions } from '../decorators/permissions.decorator';
import { ApiException } from '../dto/api-exception.dto';
import { ParseIntWithDefaultPipe } from '../pipes/parse-int-with-default.pipe';
import { IPaginationQuery, IFindAndCountResult } from './base.interface';
import { IBaseEntity } from './base.entity';

const metadataKey = 'swagger/apiModelPropertiesArray';
const excludedCreateMetadata = [':id', ':createdAt', ':updatedAt'];
const excludedUpdateMetadata = [':createdAt', ':updatedAt'];

export const getDefaultPermissions = (roles: UserRoles[] = []): Record<string, AuthConstraint> => ({
	count: { roles, permissions: [Operations.Read] },
	get: { roles, permissions: [Operations.Read] },
	getById: { roles, permissions: [Operations.Read] },
	create: { roles, permissions: [Operations.Create] },
	update: { roles, permissions: [Operations.Update] },
	updateOrCreate: { roles, permissions: [Operations.Update] },
	delete: { roles, permissions: [Operations.Delete] },
});


export function baseAuthControllerFactory<T extends IBaseEntity>(options: IBaseAuthControllerFactoryOpts<T>) {
	const Entity = options.entity;
	const EntityOutput = options.entityOutput;
	const createEntityName: string = options.entityCreateInput?.name || formatEntityName(EntityOutput);
	const updateEntityName: string = options.entityUpdateInput?.name || formatEntityName(EntityOutput, false);
	const EntityCreateInput =
		options.entityCreateInput || filterMetadata(EntityOutput, metadataKey, excludedCreateMetadata, createEntityName);
	const EntityUpdateInput =
		options.entityUpdateInput || filterMetadata(EntityOutput, metadataKey, excludedUpdateMetadata, updateEntityName);
	const auth = options.auth ? getAuthConstraints(options.auth) : getDefaultPermissions();

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
	abstract class BaseAuthController {
		protected readonly _service: BaseService<T>;
		protected readonly _socket: SocketGateway;
		protected readonly _defaultOptions: QueryOptions;

		constructor(service: BaseService<T>, socketGateway?: SocketGateway, defaultOptions?: QueryOptions ) {
			this._service = service;
			this._socket = socketGateway;
			this._defaultOptions = defaultOptions;
		}

		emit(event: Operations, data?: any) {
			this._socket?.server.emit('events', { resource: Entity.name, event, data });
		}

		@Get('count')
		@Roles(auth?.count?.roles)
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
		@Roles(auth?.get?.roles)
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
			@Response() response,
			@Query('pageNumber', new ParseIntWithDefaultPipe(0)) pageNumber: number,
			@Query('pageSize', new ParseIntWithDefaultPipe(0)) pageSize: number,
			@Query('q') q?: string,
			@Query('sortBy') sortBy?: string,
			@Query('filter') rawFilter?: string,
		) {
			try {
				const query: IPaginationQuery = {
					pageNumber,
					pageSize,
					q,
					sortBy: sortBy ? { [sortBy]: SortDirections.ASC } : (this._defaultOptions?.sortBy ?? { id: SortDirections.ASC }),
					filter: rawFilter,
				};
				const filter = query.filter ? JSON.parse(query.filter) : {};

				if (this.beforePagination) {
					await this.beforePagination(filter, req.user?.id);
				}

				const isPaginated = pageSize > 0 && pageNumber > 0;
				const params = { ...query, filter };
				const result = await this._service.findAndCount(params);

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
		@Roles(auth?.getById?.roles)
		@Permissions(...auth?.getById?.permissions)
		@ApiParam({
			name: 'id',
			description: 'The ID of the entity to find',
			required: true,
		})
		@ApiOkResponse({ type: EntityOutput })
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'FindById'))
		public async getById(@Param('id') id: string | number, @Req() req, @Response() response) {
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
		@Roles(auth?.create?.roles)
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
					await this.beforeCreate(body, req.user?.id);
				}

				const data = await this._service.create(body as typeof EntityCreateInputT);

				if (this._service.withMap) {
					const mappedData = await this._service.map(data);

					response.send(mappedData);

					if (this.afterCreate) {
						await this.afterCreate(body, data, mappedData);
					}
				}
				else {
					if (this.afterCreate) {
						await this.afterCreate(body, data);
					}
					response.send(data);
				}
			}
			catch (e) {
				throw new InternalServerErrorException(e);
			}
		}

		@Put(':id')
		@Roles(auth?.updateOrCreate?.roles)
		@Permissions(...auth?.updateOrCreate?.permissions)
		@ApiBody({
			type: EntityUpdateInputT,
			description: 'Data for entity update or create',
			required: true,
			isArray: false,
		})
		@ApiBadRequestResponse({ type: ApiException })
		@ApiOperation(getOperationId(Entity.name, 'UpdateOrCreate'))
		public async updateOrCreate(
		@Param('id') id: IdType,
			@Body() body: EntityUpdateInputT,
			@Response() response,
		) {
			const entity = await this._service.findById(id);

			if (!entity) {
				try {
					if (this.beforeUpdateOrCreate) {
						await this.beforeUpdateOrCreate(body);
					}

					const data = await this._service.update(id, body);

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

					const data = await this._service.update<typeof EntityUpdateInput>(id, body as any);

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
		@Roles(auth?.update?.roles)
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
		@Roles(auth?.delete?.roles)
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
		protected beforePagination?(filter: any, userId?: number): Promise<void>
		protected afterPagination?(filter: any, data: { data: any, total: number }, mappedData?: { data: any, total: number }): Promise<void>
		protected beforeGetById?(id: IdType, userId?: number): Promise<void>
		protected afterGetById?(id: IdType, data: any, mappedData?: any): Promise<void>
		protected beforeCreate?(body: any, userId: number): Promise<void>
		protected afterCreate?(body: any, data: any, mappedData?: any): Promise<void>
		protected beforeUpdateOrCreate?(body: any, userId?: number): Promise<void>
		protected afterUpdateOrCreate?(body: any, data: any, mappedData?: any): Promise<void>
		protected beforeUpdate?(body: any, userId?: number): Promise<void>
		protected afterUpdate?(body: any, data: any): Promise<void>
		protected beforeDelete?(id: IdType, userId?: number): Promise<void>
		protected afterDelete?(id: IdType, data: any): Promise<void>
	}

	return BaseAuthController;
}
