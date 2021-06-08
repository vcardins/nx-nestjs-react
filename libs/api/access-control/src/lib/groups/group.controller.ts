import { Controller } from '@nestjs/common';

import { SocketGateway, ModuleGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { ModuleName, UserGroup } from '@xapp/shared/types';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { GroupOutput } from './dto/group.output';

const BaseController = baseAuthControllerFactory<Group>({
	entity: Group,
	entityOutput: GroupOutput,
	auth: getDefaultPermissions([UserGroup.Admin]),
});

@Controller('/groups')
@ModuleGroup(ModuleName.Group)
export class GroupController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: GroupService,
		private readonly socketService: SocketGateway,
	) {
		super(service, socketService);
	}
}

// import { IdType } from '../base/base.type';
// import { Events } from '@xapp/shared/types';

//afterDelete(id: IdType, data: any): Promise<void> {
// 	this.emit(Events.Read);
// 	this.emit(Events.Read);
// 	this.emit(Events.Create, data);
// 	this.emit(Events.Update, data);
// 	this.emit(Events.Update, data);
// 	this.emit(Events.Delete, data);

// 	return null;
//}
