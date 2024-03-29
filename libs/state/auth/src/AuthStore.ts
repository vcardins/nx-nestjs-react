/* eslint-disable camelcase */
import jwtDecode from 'jwt-decode';

import {
	IActionResponse,
	IRoleWithPermissions,
	IJwtPayload,
	INotifier,
	ISignedUserOutput,
	ISignInInput,
	ISignInRequest,
	IUserToken,
	UserRoles,
} from '@xapp/shared/types';
import { appConfig } from '@xapp/shared/config';
import { LocalStorage, RestClient } from '@xapp/shared/utils';

const {
	apiMeta: { scope, grantType, clientId, clientSecret, accessTokenStorageKey, userInfoStorageKey, authToken },
	endpoints,
	routes,
} = appConfig;

export class AuthStore {
	readonly api = new RestClient({
		onHandleException: this.handleExceptionDisplay.bind(this),
		onHandleUnauthorizedAccess: this.handleExceptionDisplay.bind(this),
	});
	readonly notifier: INotifier;

	constructor(notifier?: INotifier) {
		this.notifier = notifier;
	}

	getAccessToken = (): string => LocalStorage.get(accessTokenStorageKey);

	getAuthHeader = (): string => `${authToken} ${this.getAccessToken()}`;

	getUserRole(): IRoleWithPermissions[] {
		const user = this.getUser();
		return user?.roles;
	}

	async getProviderUri(providerKey: string): Promise<string> {
		const url = endpoints.providerUri.replace('{provider}', providerKey);
		// eslint-disable-next-line camelcase
		return this.api.get<{ redirect_uri: string }>({ url });
	}

	async getOauthAccessToken(providerKey: string, code: string) {
		const url = endpoints.providerSignin.replace('{provider}', providerKey);
		return this.api.post<{ token: string }>({ url, data: { code } });
	}

	private async handleExceptionDisplay(error?: Error, statusCode?: number): Promise<void> {
		// this.notifier.reportError(error?.message || 'Could not complete action');
		console.error(error, statusCode);
	}

	getUser() {
		const user = LocalStorage.get(userInfoStorageKey);
		return (user || null) as ISignedUserOutput;
	}

	isAuthorized(allowedRoles: UserRoles[] = []): boolean {
		// accessLevel: AccessLevel,
		const userRoles = this.getUserRole();
		return allowedRoles.some((r) => userRoles.find((group) => group.id === r));
	}

	isUserSessionValid(): boolean {
		const accessToken = this.getAccessToken();

		if (!accessToken) {
			return false;
		}

		const decoded = jwtDecode(accessToken) as IJwtPayload;
		const currentTime = Date.now() / 1000;

		return decoded.exp > currentTime;
	}

	setSession(accessToken: string = this.getAccessToken(), expireAt?: number): void {
		if (accessToken) {
			if (expireAt) {
				// eslint-disable-next-line no-console
				console.log('Expires At', new Date(expireAt * 1000).toLocaleDateString());
			}
			LocalStorage.set(accessTokenStorageKey, accessToken);
		} else {
			LocalStorage.remove(accessTokenStorageKey);
			LocalStorage.remove(userInfoStorageKey);
		}
	}

	private setUser(user: ISignedUserOutput): void {
		LocalStorage.set(userInfoStorageKey, user);
	}

	async signInWithEmailAndPassword(props: ISignInInput): Promise<IUserToken> {
		const { email, password } = props;
		const payload: ISignInRequest = {
			grant_type: grantType,
			client_id: clientId,
			client_secret: clientSecret,
			scope,
			email,
			password,
		};

		const response: { user: ISignedUserOutput; access_token: string } = await this.api.post<IUserToken>({
			url: endpoints.signIn,
			data: payload,
			options: { noAuthToken: true },
		});

		const jwt = jwtDecode(response.access_token) as IJwtPayload;

		this.setSession(response.access_token, jwt.exp);
		this.setUser(response.user);

		return response;
	}

	signInWithToken = (): Promise<ISignedUserOutput> =>
		new Promise((resolve, reject) => {
			if (this.isUserSessionValid()) {
				this.setSession();
				resolve(this.getUser());
			} else {
				reject();
			}
		});

	signOut(message?: string): Promise<IActionResponse> {
		return new Promise((resolve) => {
			this.setSession(null);
			resolve({
				redirect: routes.signIn,
				message: message || 'User successfully logged out',
			} as IActionResponse);
		});
	}
}
