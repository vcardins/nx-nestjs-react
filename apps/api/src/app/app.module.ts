import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AutomapperModule } from 'nestjsx-automapper';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule, CoreResolver } from '@xapp/api/core';
import { AuthModule, AUTH_GUARD_TYPE } from '@xapp/api/auth';
import { AccessControlModule, UserModule } from '@xapp/api/access-control';
import { DatabaseModule } from '@xapp/api/database';
import { FilesModule } from '@xapp/api/files';
import { SocketModule } from '@xapp/api/socket';
import { ConfigModule } from '@xapp/api/config';

import { TodoModule } from './todos/todo.module';
import { LookupModule } from './lookup/lookup.module';
import { HouseholdModule } from './household/household.module';
import { TaskModule } from './tasks/tasks.module';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomTypeModule } from './shared/room_type.module';
import { FrequencyModule } from './shared/frequency.module';

interface IAppModuleProps{
	providers: Provider[];
	passportProviders: Provider[];
}

@Module({})
export class AppModule {
	static forRoot(options: IAppModuleProps): DynamicModule {
		const authModule = AuthModule.forRoot(options);
		return {
			module: AppModule,
			imports: [
				PassportModule.register({ defaultStrategy: AUTH_GUARD_TYPE }),
				ConfigModule,
				UserModule,
				AccessControlModule,
				FilesModule,
				SocketModule,
				ScheduleModule.forRoot(),
				CoreModule.forRoot(options),
				authModule,
				TodoModule,
				LookupModule,
				TaskModule,
				HouseholdModule.forFeature(authModule),
				FrequencyModule,
				RoomTypeModule,
				DatabaseModule.forRoot(),
				AutomapperModule.withMapper(),
			],
			controllers: [
				AppController,
			],
			providers: [
				AppService,
				...options.providers,
				...options.passportProviders,
				CoreResolver,
			],
		};
	}
}
