import { UserRoles, VerificationKeyPurpose } from '@xapp/shared/types';
/* eslint-disable camelcase */
import { BadRequestException, HttpService, Inject, Injectable, Logger/*, NotFoundException*/ } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';

import { OAuthProvider } from '@xapp/shared/types';
import { CustomError } from '@xapp/shared/exceptions';
import { getUtcDate } from '@xapp/shared/utils';
import { ICoreConfig, CORE_CONFIG_TOKEN } from '@xapp/api/core';
import { RoleService } from '@xapp/api/access-control';

import { FACEBOOK_CONFIG_TOKEN } from './auth-tokens/configs/facebook.config';
import { IFacebookConfig } from './auth-tokens/interfaces/facebook-config.interface';
import { GOOGLE_CONFIG_TOKEN } from './auth-tokens/configs/google.config';
import { IGoogleConfig } from './auth-tokens/interfaces/google-config.interface';
import { JwtTokenService } from './auth-tokens/jwt-token.service';

import { User, UserDto, UserProfile, UserService } from '@xapp/api/users';
import { RedirectUriOutput } from './dto/redirect-uri.output';
import { SignInInput, SignUpInput } from './dto';

const defaultContentType = 'application/x-www-form-urlencoded';

const UglyBase64 = ['+', '/', '='];
const WEEK_IN_SECONDS = 7 * 24 * 60 * 60 * 1000;
const INVALID_CREDENTIALS = 'Invalid credentials';

@Injectable()
export class AuthService {
	private localUri: string;

	constructor(
		@Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
		@Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
		@Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
		private readonly httpService: HttpService,
		private readonly userService: UserService,
		private readonly groupService: RoleService,
		private readonly tokenService: JwtTokenService,
	) {
		this.localUri = `http://${this.coreConfig.domain}${this.coreConfig.port ? `:${this.coreConfig.port}` : ''}`;
	}

	async info(id: number) {
		return await this.userService.findById(id);
	}

	async signIn({ email, password }: SignInInput): Promise<UserDto> {
		const user = await this.userService.findByEmail(email);

		if (!user || !(await user.validatePassword(password))) {
			throw new BadRequestException(INVALID_CREDENTIALS);
		}

		if (!user.dateAccountVerified) {
			throw new CustomError('Your account hasn\'t been verified. Please check your email and follow the instructions');
		}

		if (!user.isActive || user.dateAccountLocked) {
			throw new CustomError('Account is inactive or locked. Please contact the support for further instructions');
		}

		if (user.dateAccountClosed) {
			throw new CustomError('Account is closed. Please reopen your account');
		}

		if (user.failedLoginCount >= 5) {
			throw new CustomError('You have too many failed signin tries. Your account is locked');
		}

		const { userProfile, roles, ...rest } = user;

		await this.userService.update(user.id, { ...rest, lastLogin: getUtcDate() });

		return this.userService.getUserDto(user);
	}

	async signUp(userInfo: Omit<SignUpInput, 'confirmPassword'>) {
		try {
			await this.groupService.preloadAll();
		}
		catch (error) {
			throw new BadRequestException('Error in load roles');
		}

		await this.userService.assertUsernameAndEmail(userInfo.email, userInfo.username);

		const group = this.groupService.getRoleByName(UserRoles.User);
		const newUser = await plainToClass(User, userInfo).setPassword(userInfo.password);
		const info = {
			email: userInfo.email,
			expiry: new Date(new Date().getTime() + WEEK_IN_SECONDS),
		};

		const verificationKey = this.tokenService.encode(info);
		// const verified = this.tokenService.validate(verificationKey);

		newUser.roles = [group];
		newUser.dateJoined = getUtcDate();
		newUser.verificationKey = verificationKey;
		newUser.dateVerificationKeySent = getUtcDate();
		newUser.verificationKeyPurpose = VerificationKeyPurpose.ChangeEmail;

		const userProfile = new UserProfile();
		userProfile.firstName = userInfo.firstName;
		userProfile.lastName = userInfo.lastName;
		newUser.userProfile = userProfile;

		const user = await this.userService.create(newUser);

		// TODO: Email user with verification key details
		Logger.log('Notify user by email');

		return user;
	}

	requestProviderRedirectUri(provider: OAuthProvider, host?: string): RedirectUriOutput {
		let queryParams: string[];
		let loginDialogUri: string;

		switch (provider) {
			case OAuthProvider.Google:
				queryParams = [
					`client_id=${this.googleConfig.clientID}`,
					`redirect_uri=${this.googleConfig.callbackURL}`,
					`response_type=${this.googleConfig.responseType}`,
					`scope=${this.googleConfig.scopes.join(' ')}`,
				];
				loginDialogUri = this.googleConfig.loginDialogUri;
				break;
			case OAuthProvider.Facebook:
				queryParams = [
					`client_id=${this.fbConfig.clientID}`,
					`redirect_uri=${this.fbConfig.callbackURL}`,
					`state=${this.fbConfig.state}`,
				];
				loginDialogUri = this.fbConfig.loginDialogUri;
				break;
		}

		const redirect_uri = loginDialogUri && queryParams
			? `${loginDialogUri}?${queryParams.join('&')}`.replace('{host}', host)
			: null;

		Logger.log(redirect_uri, `${AuthService.name}:request${provider}RedirectUri`);

		return { redirect_uri };
	}

	async facebookSignIn(code: string, host?: string): Promise<any> {
		const { key, clientID, callbackURL, clientSecret, accessTokenUri } = this.fbConfig;
		const queryParams = [
			`client_id=${clientID}`,
			`redirect_uri=${callbackURL}`,
			`client_secret=${clientSecret}`,
			`code=${code}`,
		].join('&');

		const uri = `${accessTokenUri}?${queryParams}`.replace('{host}', host);
		// Logger.log(uri, AuthService.name + ':facebookSignIn');
		try {
			const response = await this.httpService
				.get(uri)
				.pipe(map((res) => res.data)) //  .userInfo
				.toPromise();

			if (response.error) {
				Logger.error(JSON.stringify(response), undefined, AuthService.name);
				throw new BadRequestException(response.error.message);
			}

			const uriToken = this.getProviderTokenApiUri(key);
			const profileResponse = await this.httpService
				.post(uriToken, stringify({ access_token: response.access_token }), {
					headers: { 'Content-Type': defaultContentType },
				})
				.pipe(map((res) => res.data))
				.toPromise();
			// Logger.log(JSON.stringify(profileResponse), AuthService.name + ':facebookSignIn');
			if (profileResponse.error) {
				Logger.error(JSON.stringify(profileResponse), undefined, AuthService.name);
				throw new BadRequestException(profileResponse.error.message);
			}

			return profileResponse;
		}
		catch (error) {
			Logger.error(
				JSON.stringify(error && error.response ? error.response.data : error.message),
				undefined,
				AuthService.name,
			);
			throw new BadRequestException(
				error?.response?.data?.error
					? error.response.data.error.message
					: error.message,
			);
		}
	}

	async googleSignIn(code: string, host?: string): Promise<any> {
		const { key, clientID: client_id, clientSecret: client_secret, callbackURL, grant_type, accessTokenUri } = this.googleConfig;
		const formData: any = {
			code,
			client_id,
			client_secret,
			redirect_uri: callbackURL.replace('{host}', host),
			grant_type,
		};

		const uri = accessTokenUri.replace('{host}', host);

		try {
			// Logger.log(`${JSON.stringify(formData)} ${uri}`, `${AuthService.name}:uri`);

			const response = await this.httpService
				.post(uri, stringify(formData), {
					headers: { 'Content-Type': defaultContentType },
				})
				.pipe(map((res) => res.data))
				.toPromise();

			if (response.error) {
				Logger.error(JSON.stringify(response), undefined, AuthService.name);
				throw new BadRequestException(response.error_description);
			}

			// const uriToken = `https://oauth2.googleapis.com/tokeninfo?id_token=${response.id_token}`; //this.getProviderTokenApiUri(key);
			// // Logger.log(`${response.id_token}`, `${AuthService.name}:response`);

			// const profileResponse = await this.httpService
			// 	.get(uriToken)
			// 	.pipe(map((res) => res.data))
			// 	.toPromise();
			const uriToken = this.getProviderTokenApiUri(key);
			// Logger.log(`${JSON.stringify(response)}`, `${AuthService.name}:response`);

			const profileResponse = await this.httpService
				.post(uriToken, stringify({ access_token: response.access_token }), {
					headers: { 'Content-Type': defaultContentType },
				})
				.pipe(map((res) => res.data))
				.toPromise();

			// Logger.log(JSON.stringify(profileResponse), `${AuthService.name}:googleSignIn`);

			if (profileResponse.error) {
				Logger.error(JSON.stringify(profileResponse), undefined, AuthService.name);
				throw new BadRequestException(profileResponse.error_description);
			}

			return profileResponse;
		}
		catch (error) {
			Logger.error(
				JSON.stringify(error?.response ? error.response.data : error.message),
				undefined,
				AuthService.name,
			);
			throw new BadRequestException(
				error?.response?.data?.error
					? error.response.data.error.message
					: error.message,
			);
		}
	}

	private getProviderTokenApiUri(providerKey: string) {
		return  `${this.localUri}/api/auth/${providerKey}/token`;
	}

	protected stripUglyBase64(s: string ) {
		if (s == null) {
			return null;
		}

		let finalString = s;
		UglyBase64.forEach((char) => {
			finalString = finalString.replace(char, '');
		});

		return finalString;
	}
}
