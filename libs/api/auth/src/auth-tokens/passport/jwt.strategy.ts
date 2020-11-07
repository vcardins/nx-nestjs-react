import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { User, UserService } from '@xapp/api/users';
import { GroupService } from '@xapp/api/access-control';

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
		private readonly groupService: GroupService,
	) {
		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secretKey,
		});
	}

	public async validate(payload: IJwtPayload) {
		try {
			await this.groupService.preloadAll();
		}
		catch (error) {
			console.error(error);
			throw new BadRequestException('Error in load groups');
		}

		try {
			// const groups = items.map((item) => payload.groups.find(({name}) => name === item.name));
			// Logger.log(JSON.stringify(groups), JwtStrategy.name);
			// {
			// 	...payload,
			// 	groups: payload.groups.map((group) => items.filter(({name}) => group.name === name)),
			// }
			// const user = await this.userService.findById(payload?.id);

			// const updatedUser = {
			// 	...user,
			// 	groups: user.groups.map((group) => payload.groups.filter(({name}) => group.name === name)),
			// };
			return plainToClass(User, payload);
		}
		catch (error) {
			throw new UnauthorizedException();
		}
	}
}
