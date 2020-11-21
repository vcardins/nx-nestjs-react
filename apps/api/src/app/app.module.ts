import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AutomapperModule } from 'nestjsx-automapper';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule } from '@xapp/api/core';
import { AuthModule } from '@xapp/api/auth';
import { AccessControlModule } from '@xapp/api/access-control';
import { UserModule } from '@xapp/api/users';
import { DatabaseModule } from '@xapp/api/database';
import { FilesModule } from '@xapp/api/files';
import { ConfigModule } from '@xapp/api/config';
import { AUTH_GUARD_TYPE } from '@xapp/api/auth';

import { TodoModule } from './todos/todo.module';
import { LookupModule } from './lookup/lookup.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

interface IAppModuleProps{
	providers: Provider[];
	passportProviders: Provider[];
}

@Module({})
export class AppModule {
	static forRoot(options: IAppModuleProps): DynamicModule {
		return {
			module: AppModule,
			imports: [
				PassportModule.register({ defaultStrategy: AUTH_GUARD_TYPE }),
				ConfigModule,
				UserModule,
				AccessControlModule,
				FilesModule,
				ScheduleModule.forRoot(),
				CoreModule.forRoot(options),
				AuthModule.forRoot(options),
				TodoModule,
				LookupModule,
				DatabaseModule.forRoot(),
				AutomapperModule.withMapper(),
			],
			controllers: [
				AppController,
			],
			providers: [
				AppService,
				...options.providers,
				...(options.passportProviders ?? []),
			],
		};
	}
}
