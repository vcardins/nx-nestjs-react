import { IResponse, ISignInInput, ISignedUserOutput } from '@xapp/shared/interfaces';

export interface IAuthContext {
	accessToken: string | null;
	user: ISignedUserOutput | null;
	authHeader: string;
	// eslint-disable-next-line camelcase
	getProviderUri: (providerKey: string) => Promise<{ redirect_uri: string }>;
	getOauthAccessToken?: (providerKey: string, code: string) => Promise<{token: string}>;
	onSignIn: (props: ISignInInput) => Promise<ISignedUserOutput> | Promise<IResponse>;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
	isSessionValid: () => boolean;
}
