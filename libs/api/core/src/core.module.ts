import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AutomapperModule } from 'nestjsx-automapper';

import { SocketModule } from './socket/socket.module';

@Module({})
export class CoreModule {
	static forFeature(options?: { providers: Provider[] }): DynamicModule {
		return {
			module: CoreModule,
			imports: [],
			providers: [
				...options?.providers ?? [],
			],
			exports: [],
		};
	}

	static forRoot(options?: { providers: Provider[] }): DynamicModule {
		return {
			module: CoreModule,
			imports: [
				AutomapperModule.withMapper(),
				SocketModule,
			],
			controllers: [],
			providers: [
				...options?.providers ?? [],
			],
			exports: [],
		};
	}
}
