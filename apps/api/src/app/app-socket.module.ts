
import { Global, DynamicModule } from '@nestjs/common';
import { UserModule } from '@xapp/api/access-control';

import { AppGateway } from './app.gateway';

@Global()
export class AppSocketModule {
	static forRoot(authModule: DynamicModule): DynamicModule {
		return {
			module: AppSocketModule,
			imports: [
				authModule,
				UserModule,
			],
			controllers: [],
			providers: [AppGateway],
			exports: [AppGateway],
		};
	}
}
