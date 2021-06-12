import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { Group } from './user-groups/user-group.entity';
import { GroupService } from './user-groups/user-group.service';
import { GroupController } from './user-groups/user-group.controller';

import { Permission } from './permissions/permission.entity';
import { PermissionService } from './permissions/permission.service';
import { PermissionController } from './permissions/permission.controller';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Group, Permission,
		]),
	],
	controllers:[
		GroupController,
		PermissionController,
	],
	providers: [GroupService, PermissionService],
	exports: [GroupService, PermissionService],
})
export class AccessControlModule {}
