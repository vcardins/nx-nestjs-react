import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';

import { Group } from './groups/group.entity';
import { GroupService } from './groups/group.service';
import { GroupController } from './groups/group.controller';

import { Permission } from './permissions/permission.entity';
import { PermissionService } from './permissions/permission.service';
import { PermissionController } from './permissions/permission.controller';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Group, Permission,
		])
	],
	controllers:[
		GroupController,
		PermissionController,
	],
	providers: [GroupService, PermissionService],
	exports: [GroupService, PermissionService],
})
export class AccessControlModule {}
