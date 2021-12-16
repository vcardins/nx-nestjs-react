
import { Global, DynamicModule, Provider } from '@nestjs/common';
import { AuthModule } from '@xapp/api/auth';
import { UserModule } from '@xapp/api/access-control';

import { BaseSocketGateway } from './socket.gateway';

@Global()
export class SocketModule {
	static forRoot(options?: { providers: Provider[]; jwtSecretKey: string }): DynamicModule {
		return {
			module: SocketModule,
			imports: [
				AuthModule.forRoot(options),
				UserModule,
			],
			controllers: [],
			providers: [BaseSocketGateway],
			exports: [BaseSocketGateway],
		};
	}
}
