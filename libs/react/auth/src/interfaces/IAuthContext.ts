import { IActionResponse } from '@xapp/shared';
import { ISignInInput, ISignedUserOutput } from '@xapp/shared/auth';

export interface IAuthContext {
	accessToken: string | null;
	user: ISignedUserOutput | null;
	authHeader: string;
	// eslint-disable-next-line camelcase
	getProviderUri: (providerKey: string) => Promise<{ redirect_uri: string }>;
	getOauthAccessToken?: (providerKey: string, code: string) => Promise<{token: string}>;
	onSignIn: (props: ISignInInput) => Promise<ISignedUserOutput> | Promise<IActionResponse>;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
	isSessionValid: () => boolean;
}
