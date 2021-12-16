import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { extract, parse } from 'query-string';
import { ServerOptions } from 'socket.io';

import { JwtTokenService } from '@xapp/api/auth';

export class AuthenticatedSocketIoAdapter extends IoAdapter {
	private readonly jwtService: JwtTokenService;
	constructor(private app: INestApplicationContext) {
		super(app);
		this.jwtService = this.app.get(JwtTokenService);
	}

	createIOServer(port: number, options?: ServerOptions): any {
		options.allowRequest = async (request, allowFunction) => {
			const token = parse(extract(request.url))?.token as string;
			const jwtPayload = this.jwtService.verify(token);

			if (jwtPayload) {
				return allowFunction(null, true);
			}

			return allowFunction('Unauthorized', false);
		};

		return super.createIOServer(port, options);
	}
}
