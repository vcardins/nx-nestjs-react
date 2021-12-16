import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UserService } from '@xapp/api/access-control';
import { IJwtRefreshTokenPayload } from '../interfaces/jwt-refresh-token-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
	constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					return request?.cookies?.Refresh;
				},
			]),
			secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: IJwtRefreshTokenPayload) {
		const refreshToken = request.cookies?.Refresh;
		return this.userService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
	}
}
