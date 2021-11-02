import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { Operation } from './operation/operation.entity';
import { OperationService } from './operation/operation.service';
import { OperationController } from './operation/operation.controller';

import { Resource } from './resource/resource.entity';
import { ResourceService } from './resource/resource.service';
import { ResourceController } from './resource/resource.controller';

import { Role } from './role/role.entity';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller';

import { Permission } from './permission/permission.entity';
import { PermissionService } from './permission/permission.service';
import { PermissionController } from './permission/permission.controller';
import { SocketService } from '@xapp/api/socket';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Role, Permission,
			Operation, Resource,
		]),
	],
	controllers:[
		RoleController,
		PermissionController,
		OperationController,
		ResourceController,
	],
	providers: [
		SocketService,
		RoleService,
		PermissionService,
		OperationService,
		ResourceService,
	],
	exports: [
		RoleService,
		PermissionService,
		OperationService,
		ResourceService,
	],
})
export class AccessControlModule {}
