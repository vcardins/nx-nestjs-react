import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AutomapperModule } from 'nestjsx-automapper';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule, CoreResolver } from '@xapp/api/core';
import { AuthModule, AUTH_GUARD_TYPE } from '@xapp/api/auth';
import { AccessControlModule, UserModule } from '@xapp/api/access-control';
import { DatabaseModule } from '@xapp/api/database';
import { FilesModule } from '@xapp/api/files';
import { ConfigModule } from '@xapp/api/config';

import { TodoModule } from './todos/todo.module';
import { LookupModule } from './lookup/lookup.module';
import { HouseholdModule } from './household/household.module';
import { TaskModule } from './tasks/tasks.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomTypeModule } from './shared/room_type.module';
import { FrequencyModule } from './shared/frequency.module';
import { AppSocketModule } from './app-socket.module';
import { AppGateway } from './app.gateway';

interface IAppModuleProps {
	jwtSecretKey: string;
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
				AccessControlModule,
				AppSocketModule.forRoot(authModule),
				authModule,
				AutomapperModule.withMapper(),
				ConfigModule,
				CoreModule.forRoot(options),
				DatabaseModule.forRoot(),
				FilesModule,
				FrequencyModule,
				HouseholdModule.forFeature(authModule),
				LookupModule,
				PassportModule.register({ defaultStrategy: AUTH_GUARD_TYPE }),
				RoomTypeModule,
				ScheduleModule.forRoot(),
				TaskModule.forRoot(authModule),
				TodoModule,
				UserModule,
			],
			controllers: [
				AppController,
			],
			exports: [],
			providers: [
				AppService,
				...options.providers,
				...options.passportProviders,
				CoreResolver,
			],
		};
	}
}
