/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode';
import { EventEmitter } from 'fbemitter';

import {
	ISignedUserOutput,
	IUserToken,
	IGroupWithPermissions,
	IJwtPayload,
	ISignInInput,
} from '../interfaces';
import { UserGroup } from '../enums';

import { appConfig } from '@xapp/shared/config';
import { LocalStorage, RestClient } from '@xapp/shared/utils';
import { IActionResponse } from '@xapp/shared/types';
// import { INotifier, Notifier } from '@xapp/react/core';

const {
	apiMeta: {
		scope,
		grantType,
		clientId,
		clientSecret,
		accessTokenStorageKey,
		userInfoStorageKey,
		authToken,
	},
	endpoints,
	routes,
} = appConfig;

/**
 * Performs User account api calls
 * @class AuthService
 * @extends {EventEmitter}
 * @implements {IAuthService}
 */
class AuthService extends EventEmitter {
	readonly api: RestClient;
	// readonly notifier: INotifier;

	constructor() {
		super();
		// this.notifier = new Notifier();
		this.api = new RestClient({
			onHandleException: this.handleExceptionDisplay.bind(this),
			onHandleUnauthorizedAccess: this.handleExceptionDisplay.bind(this),
		});
	}

	private handleAuthentication = () => {
		if ( this.isUserSessionValid() ) {
			this.emit('onAutoLogin');
		}
		else {
			this.emit('onAutoLogout', 'No valid access token');
		}

		this.setSession();
	}

	on = this.addListener;

	off = this.removeAllListeners;

	init = this.handleAuthentication;

	getAccessToken = (): string => LocalStorage.get(accessTokenStorageKey);

	getAuthHeader = (): string => `${authToken} ${this.getAccessToken()}`;

	getUserGroup(): IGroupWithPermissions[] {
		const user = this.getUser();
		return user?.groups;
	}

	async getProviderUri(providerKey: string) {
		const url = endpoints.providerUri.replace('{provider}', providerKey);
		// eslint-disable-next-line camelcase
		return await this.api.get<{redirect_uri: string}>({ url });
	}

	async getOauthAccessToken(providerKey: string, code: string) {
		const url = endpoints.providerSignin.replace('{provider}', providerKey);
		return this.api.post<{token: string}>({ url, data: { code } });
	}

	private async handleExceptionDisplay(
		error?: Error,
		statusCode?: number,
	): Promise<void> {
		// this.notifier.reportError(error?.message || 'Could not complete action');
		console.error(error, statusCode);
	}

	getUser() {
		const user = LocalStorage.get(userInfoStorageKey);
		return (user || null) as ISignedUserOutput;
	}

	isAuthorized(allowedGroups: UserGroup[] = []): boolean { // accessLevel: AccessLevel,
		const userGroups = this.getUserGroup();
		return allowedGroups.some((r) => userGroups.find((group) => group.name.indexOf(r) >= 0));
	}

	isUserSessionValid(): boolean {
		const accessToken = this.getAccessToken();

		if (!accessToken) {
			this.emit('onNoAccessToken');
			return false;
		}

		const decoded = jwtDecode(accessToken) as IJwtPayload;
		const currentTime = Date.now() / 1000;

		return decoded.exp > currentTime;
	}

	setSession(accessToken: string = this.getAccessToken(), expireAt?: number): void {
		if ( accessToken ) {
			if (expireAt) {
				// eslint-disable-next-line no-console
				console.log('Expires At', new Date(expireAt * 1000).toLocaleDateString());
			}
			LocalStorage.set(accessTokenStorageKey, accessToken);
		}
		else {
			LocalStorage.remove(accessTokenStorageKey);
			LocalStorage.remove(userInfoStorageKey);
		}
	}

	setUser(user: any): void {
		LocalStorage.set(userInfoStorageKey, user);
	}

	async signInWithEmailAndPassword(props: ISignInInput): Promise<IUserToken> {
		const { email, password } = props;
		const payload: any = {
			grant_type: grantType,
			client_id: clientId,
			client_secret: clientSecret,
			scope,
			email,
			password,
		};

		const response = await this.api.post<IUserToken>({
			url: endpoints.signIn,
			data: payload,
			options: { noAuthToken: true },
		});

		const jwt = jwtDecode(response.access_token) as IJwtPayload;

		this.setSession(response.access_token, jwt.exp);
		this.setUser(response.user);

		return response;
	}

	signInWithToken = (): Promise<ISignedUserOutput> => new Promise((resolve, reject) => {
		if ( this.isUserSessionValid() ) {
			this.setSession();
			resolve(this.getUser());
		}
		else {
			reject();
		}
	});

	signOut(message?: any): Promise<IActionResponse> {
		return new Promise((resolve) => {
			this.setSession(null);
			resolve({
				redirect: routes.signIn,
				message: message || 'User successfully logged out',
			} as IActionResponse);
		});
	}
}

const instance = new AuthService();

export { instance as AuthService };
