import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtPayload } from '@xapp/shared/types';
import { User, UserDto } from '@xapp/api/access-control';

import { JWT_CONFIG_TOKEN } from './configs/jwt.config';
import { IJwtConfig } from './interfaces/jwt-config.interface';

@Injectable()
export class JwtTokenService {
	constructor(
		@Inject(JWT_CONFIG_TOKEN) private readonly jwtConfig: IJwtConfig,
		private readonly jwtService: JwtService,
	) {}
	create(user: UserDto) {
		return this.jwtService.sign(
			{
				id: user.id,
				username: user.username,
				lastLogin: user.lastLogin,
				isActive: user.isActive,
				isSuperuser: user.isSuperuser,
				roles: user.roles,
			},
			{
				secret: this.jwtConfig.secretKey,
				expiresIn: this.jwtConfig.expirationDelta,
			},
		);
	}

	encode(data: any) {
		return this.jwtService.sign(data, { secret: this.jwtConfig.secretKey });
	}

	validate(token: string) {
		return this.jwtService.verify(token, { secret: this.jwtConfig.secretKey });
	}

	decode(token: string) {
		return this.jwtService.decode(token) as IJwtPayload;
	}

	removeHeaderPrefix(token: string) {
		return this.jwtConfig.authHeaderPrefix && token?.split(`${this.jwtConfig.authHeaderPrefix  } `).length > 1
			? token.split(`${this.jwtConfig.authHeaderPrefix  } `)[1]
			: token;
	}

	createSecretKey(user: User) {
		const { id, isActive, isSuperuser } = user;
		let userRoles = '';
		let key = '';

		if (user) {
			userRoles = user.roles?.map(({ name }) => `$${name}`).join('');
			key = `$${id}$${isActive}$${isSuperuser}${userRoles}`;
		}

		return `${this.jwtConfig.secretKey}${key}`;
	}
}
