import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

// import { UserService } from '@xapp/api/access-control';
import { AUTH_GUARD_TYPE, JwtTokenService } from '@xapp/api/auth';

@Injectable()
export class WsGuard extends AuthGuard(AUTH_GUARD_TYPE) {
	constructor(
		private readonly reflector: Reflector,
		private tokenService: JwtTokenService,
		// private userService: UserService,
	) {
		super();
		// console.log(tokenService);
	}

	async canActivate(context: ExecutionContext) {
		const accessToken = context.getArgs()[0].handshake.query['token'] as string;

		try {
			const decoded = this.tokenService.verify(accessToken);
			console.log(decoded.id);

			// const user = await this.userService.findById(decoded.id);
			return !!decoded.id;
		} catch (ex) {
			console.log(ex);
			return false;
		}
	}
}
