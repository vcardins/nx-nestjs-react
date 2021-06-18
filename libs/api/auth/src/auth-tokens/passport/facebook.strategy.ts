import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { use } from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';

import { OAuthProvider } from '@xapp/shared/types';

import { FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { OauthTokensAccessTokenService } from '../oauth-tokens-access-token.service';
import { OauthTokensAccessToken } from '../oauth-tokens-access-token.entity';

import { AuthService } from '../../auth.service';
import { SignUpInput } from '../../dto/signup.input';

@Injectable()
export class FacebookStrategy {
	constructor(
		@Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
		private readonly oauthTokensAccessTokenService: OauthTokensAccessTokenService,
		private readonly authService: AuthService,
	) {
		this.init();
	}

	private init(): void {
		use(
			OAuthProvider.Google,
			new FacebookTokenStrategy(
				{
					clientID: this.fbConfig.clientID,
					clientSecret: this.fbConfig.clientSecret,
				},
				async (
					accessToken: string,
					refreshToken: string,
					profile: any,
					done: any,
				) => {
					// Logger.log(JSON.stringify(profile), FacebookStrategy.name);
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
								: `${profile.id}@facebook.com`;
							const firstName = profile.name.givenName;
							const lastName = profile.name.familyName;
							const password = `facebook_${profile.id}`;
							const user = await this.authService.signUp(
								plainToClass(SignUpInput, {
									email,
									password,
									firstName,
									lastName,
								}),
							);
							const newOauthTokensAccessToken = new OauthTokensAccessToken();

							newOauthTokensAccessToken.user = user;
							newOauthTokensAccessToken.providerClientId = profile.id;
							newOauthTokensAccessToken.provider = profile.provider;
							newOauthTokensAccessToken.accessToken = accessToken;


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
