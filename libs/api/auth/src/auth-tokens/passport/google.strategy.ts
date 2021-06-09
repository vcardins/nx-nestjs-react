import { Inject, Injectable, Logger } from '@nestjs/common';
import { use } from 'passport';
// https://github.com/iMichaelOwolabi/google-oauth-nestjs
import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { plainToClass } from 'class-transformer';

import { OAuthProvider } from '@xapp/shared/types';
import { GOOGLE_CONFIG_TOKEN } from '../configs/google.config';
import { IGoogleConfig } from '../interfaces/google-config.interface';
import { OauthTokensAccessTokenService } from '../oauth-tokens-access-token.service';
import { AuthService } from '../../auth.service';
import { OauthTokensAccessToken } from '../oauth-tokens-access-token.entity';
import { SignUpInput } from '../../dto/signup.input';

@Injectable()
export class GoogleStrategy { //extends PassportStrategy(Strategy, 'google') {
	options: StrategyOptionsWithRequest;
	constructor(
		@Inject(GOOGLE_CONFIG_TOKEN)
		private readonly googleConfig: IGoogleConfig,
		private readonly oauthTokensAccessTokenService: OauthTokensAccessTokenService,
		private readonly authService: AuthService,
	) {
		// eslint-disable-next-line immutable/no-mutation
		this.options = {
			clientID: this.googleConfig.clientID,
			clientSecret: this.googleConfig.clientSecret,
			callbackURL: this.googleConfig.callbackURL,
			passReqToCallback : true,
		};
		this.init();
	}

	// async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
	// 	const { id, name, emails, photos, provider } = profile;
	// 	Logger.log(profile, 'GoogleStrategy');

	// 	if (!id) {
	// 		done(null, null);
	// 	}

	// 	try {
	// 		try {
	// 			const { oauthTokensAccessToken } = await this.oauthTokensAccessTokenService.findByProviderClientId(id);
	// 			const user = await this.authService.info(oauthTokensAccessToken.user.id);
	// 			done(null, user);
	// 		}
	// 		catch (err) {
	// 			const googleUser = {
	// 				username: `google_${id}`,
	// 				password: `google_${id}`,
	// 				email: emails[0].value,
	// 				firstName: name?.givenName || `google_${id}`,
	// 				lastName: name?.familyName || `google_${id}`,
	// 				pictureUrl: photos[0].value,
	// 			};

	// 			const user = await this.authService.signUp(plainToClass(SignUpInput, googleUser));
	// 			const newOauthTokensAccessToken = new OauthTokensAccessToken();

	// 			/* eslint-disable immutable/no-mutation */
	// 			newOauthTokensAccessToken.user = user;
	// 			newOauthTokensAccessToken.providerClientId = id;
	// 			newOauthTokensAccessToken.provider = provider;
	// 			newOauthTokensAccessToken.accessToken = accessToken;
	// 			/* eslint-enable immutable/no-mutation */

	// 			await this.oauthTokensAccessTokenService.create(newOauthTokensAccessToken);
	// 			done(null, user);
	// 		}
	// 	}
	// 	catch (err) {
	// 		done(err, null);
	// 	}
	// }

	private init(): void {
		use(
			OAuthProvider.Google,
			new Strategy (
				this.options,
				async (request: any, accessToken: string, refreshToken: string, profile: any, done) => {
					Logger.log(JSON.stringify(profile), GoogleStrategy.name);
					// console.log(this.options);
					if (!profile.id) {
						done(null, null);
					}

					try {
						try {
							const { oauthTokensAccessToken } = await this.oauthTokensAccessTokenService.findByProviderClientId(profile.id);
							const user = await this.authService.info(oauthTokensAccessToken.user.id);
							done(null, user);
						}
						catch (err) {
							const email = profile?.emails?.[0]?.value
								? profile.emails[0].value
								: `${profile.id}@google.com`;
							const username = `google_${profile.id}`;
							const firstName = profile.name ? profile.name.givenName : `google_${profile.id}`;
							const lastName = profile.name ? profile.name.familyName : `google_${profile.id}`;
							const password = `google_${profile.id}`;
							const user = await this.authService.signUp(
								plainToClass(SignUpInput, {
									email,
									username,
									password,
									firstName,
									lastName,
								}),
							);
							const newOauthTokensAccessToken = new OauthTokensAccessToken();
							/* eslint-disable immutable/no-mutation */
							newOauthTokensAccessToken.user = user;
							newOauthTokensAccessToken.providerClientId = profile.id;
							newOauthTokensAccessToken.provider = profile.provider;
							newOauthTokensAccessToken.accessToken = accessToken;
							/* eslint-enable immutable/no-mutation */

							await this.oauthTokensAccessTokenService.create(newOauthTokensAccessToken);
							done(null, user);
						}
					}
					catch (err) {
						done(err, null);
					}
				},
			),
		);
	}
}
