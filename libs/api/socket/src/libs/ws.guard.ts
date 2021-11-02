import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

// import { UserService } from '@xapp/api/access-control';
// import { JwtTokenService } from '@xapp/api/auth';

@Injectable()
export class WsGuard implements CanActivate {
	constructor(
		// private tokenService: JwtTokenService,
		// private userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		console.log(context);
		// const accessToken = context.args[0].handshake.query['token'] as string;
		// console.log('AccessToken', accessToken);
		return false;
		// try {
		// 	const decoded = this.tokenService.validate(accessToken);
		// 	console.log(decoded);

		// 	const user = await this.userService.findById(decoded.id);
		// 	return !!user;
		// } catch (ex) {
		// 	console.log(ex);
		// 	return false;
		// }
	}
}
