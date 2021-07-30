import { Controller } from '@nestjs/common';

import { SocketGateway, ResourceGroup, baseAuthControllerFactory, getDefaultPermissions } from '@xapp/api/core';
import { Resources, AuthGroups } from '@xapp/shared/types';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { RoleOutput } from './dto/role.output';

const BaseController = baseAuthControllerFactory<Role>({
	entity: Role,
	entityOutput: RoleOutput,
	auth: getDefaultPermissions(AuthGroups.Admin),
});

@Controller('/roles')
@ResourceGroup(Resources.Role)
export class RoleController extends BaseController {
	constructor(
		// private readonly configService: ConfigService,
		private readonly service: RoleService,
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
