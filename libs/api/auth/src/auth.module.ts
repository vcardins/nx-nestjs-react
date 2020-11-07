import { DynamicModule, HttpModule, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { authenticate } from 'passport';

import { CoreModule } from '@xapp/api/core';
import { MailModule } from '@xapp/api/mail';
import { FilesModule } from '@xapp/api/files';
import { OAuthProvider } from '@xapp/shared/enums';
import { DatabaseModule } from '@xapp/api/database';
import { UserModule } from '@xapp/api/users';
import { AccessControlModule } from '@xapp/api/access-control';

import { OauthTokensAccessToken } from './auth-tokens/oauth-tokens-access-token.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtTokenService } from './auth-tokens/jwt-token.service';
import { OauthTokensAccessTokenService } from './auth-tokens/oauth-tokens-access-token.service';

export const services = [
	JwtTokenService,
	AuthService,
	OauthTokensAccessTokenService,
];

const entities = [
	OauthTokensAccessToken,
];

@Module({})
export class AuthModule implements NestModule {
	static forFeature(options?: { providers: Provider[] }): DynamicModule {
		const providers = options?.providers ?? [];

		return {
			module: AuthModule,
			imports: [
				HttpModule,
				UserModule,
				AccessControlModule,
				MailModule,
				FilesModule,
				CoreModule.forFeature(options),
				DatabaseModule.forFeature(entities),
			],
			providers: [...providers, ...services],
			exports: services,
		};
	}
	static forRoot(options?: { providers: Provider[] }): DynamicModule {
		const providers = options?.providers ?? [];

		return {
			module: AuthModule,
			imports: [
				HttpModule,
				MailModule,
				UserModule,
				AccessControlModule,
				JwtModule.register({ secret: 'secret_key' }),
				CoreModule.forFeature(options),
				DatabaseModule.forFeature(entities),
			],
			controllers: [
				AuthController,
			],
			providers: [...providers, ...services],
			exports: services,
		};
	}

	public configure(consumer: MiddlewareConsumer) {
		const options = { session: false, passReqToCallback: true };

		consumer
			.apply(authenticate('signup', options))
			.forRoutes('api/auth/signup');
		consumer
			.apply(authenticate('signin', options))
			.forRoutes('api/auth/signin');

		Object.keys(OAuthProvider).forEach((providerKey) => {
			const provider = OAuthProvider[providerKey];
			consumer
				.apply(authenticate(provider, options))
				.forRoutes(`api/auth/${provider}/token`);
		});
	}
}
