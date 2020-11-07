/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode';
import { EventEmitter } from 'fbemitter';

import {
	ISignedUserOutput,
	IUserToken,
	IGroupWithPermissions,
	IActionResponse,
	IJwtPayload,
} from '@xapp/shared/interfaces';
import { UserGroup } from '@xapp/shared/enums';
import { appConfig } from '@xapp/shared/config';
import { LocalStorage, RestClient } from '@xapp/shared/services';

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

const api = new RestClient();
/**
 * Performs User account api calls
 * @class AuthService
 * @extends {EventEmitter}
 * @implements {IAuthService}
 */
class AuthService extends EventEmitter {
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
		return await api.get<{redirect_uri: string}>({url});
	}

	async getOauthAccessToken(providerKey: string, code: string) {
		const url = endpoints.providerSignin.replace('{provider}', providerKey);
		return api.post<{token: string}>({url, data: { code }});
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

		if ( !accessToken ) {
			this.emit('onNoAccessToken');
			return false;
		}

		const decoded: IJwtPayload = jwtDecode(accessToken);
		const currentTime = Date.now() / 1000;

		return decoded.exp > currentTime;
	}

	setSession(accessToken: string = this.getAccessToken(), expireAt?: number, persist?: boolean): void {
		if ( accessToken ) {
			// eslint-disable-next-line no-console
			console.log('Expires At', new Date(expireAt).toLocaleDateString(), persist);
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

	async signInWithEmailAndPassword(
		email: string,
		password: string,
		rememberMe: boolean,
	): Promise<IUserToken> {
		const payload: any = {
			grant_type: grantType,
			client_id: clientId,
			client_secret: clientSecret,
			scope,
			email,
			password,
		};

		const response = await api.post<IUserToken>({
			url: endpoints.signIn,
			data: payload,
			options: { withoutCredentials: true },
		});

		const jwt: IJwtPayload = jwtDecode(response.access_token);

		this.setSession(response.access_token, jwt.exp, rememberMe);
		this.setUser(response.user);

		return response;
	}

	signInWithToken = (): Promise<ISignedUserOutput> => {
		return new Promise((resolve, reject) => {
			if ( this.isUserSessionValid() ) {
				this.setSession();
				resolve(this.getUser());
			}
			else {
				reject();
			}
		});
	}

	signOut(message?: any): Promise<IActionResponse<any>> {
		return new Promise((resolve) => {
			this.setSession(null);
			resolve({
				redirect: routes.signIn,
				message: message || 'User successfully logged out',
			} as IActionResponse<any>);
		});
	}
}

const instance = new AuthService();

export { instance as AuthService };
