import { Module } from '@nestjs/common';

import { DatabaseModule } from '@xapp/api/database';
import { FilesModule } from '@xapp/api/files';
import { MailModule } from '@xapp/api/mail';
import { AccessControlModule } from '@xapp/api/access-control';

import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { UserProfile } from './entities/user_profile.entity';
import { LoggedIn } from './entities/logged_in.entity';

const entities = [
	User,
	UserProfile,
	LoggedIn,
];

const providers = [
	UserService,
	AccountService,
];

@Module({
	imports: [
		AccessControlModule,
		FilesModule,
		MailModule,
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
