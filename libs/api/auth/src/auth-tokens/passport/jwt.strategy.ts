import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User, UserService } from '@xapp/api/access-control';
import { RoleService } from '@xapp/api/access-control';

import { JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IJwtConfig } from '../interfaces/jwt-config.interface';
import { AUTH_GUARD_TYPE } from '../../constants';
// import { TokenService } from '../services/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_GUARD_TYPE) {
	constructor(
		@Inject(JWT_CONFIG_TOKEN) private readonly jwtConfig: IJwtConfig,
		private readonly userService: UserService,
		private readonly roleService: RoleService,
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secretKey,
		});
	}

	public async validate(payload: IJwtPayload) {
		try {
			await this.roleService.preloadAll();
		}
		catch (error) {
			console.error(error);
			throw new BadRequestException('Error in load roles');
		}

		try {
			// const roles = items.map((item) => payload.roles.find(({name}) => name === item.name));
			// Logger.log(JSON.stringify(roles), JwtStrategy.name);
			// {
			// 	...payload,
			// 	roles: payload.roles.map((role) => items.filter(({name}) => role.name === name)),
			// }
			// const user = await this.userService.findById(payload?.id);

			// const updatedUser = {
			// 	...user,
			// 	roles: user.roles.map((role) => payload.roles.filter(({name}) => role.name === name)),
			// };
			return plainToClass(User, payload);
		}
		catch (error) {
			throw new UnauthorizedException();
		}
	}
}
