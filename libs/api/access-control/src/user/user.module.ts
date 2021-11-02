import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { FilesModule } from '@xapp/api/files';
import { MailModule } from '@xapp/api/mail';
import { SocketModule } from '@xapp/api/socket';

import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

import { User } from './entities/user.entity';
import { UserProfile } from './entities/user_profile.entity';
import { UserSession } from './entities/user_session.entity';

const entities = [
	User,
	UserProfile,
	UserSession,
	Role,
];

const providers = [
	UserService,
	RoleService,
	AccountService,
];

@Module({
	imports: [
		FilesModule,
		MailModule,
		SocketModule,
		DatabaseModule.forFeature(entities),
	],
	controllers: [
		UserController,
		AccountController,
	],
	providers,
	exports: providers,
})
export class UserModule {}
