/* eslint-disable camelcase */
import { IGoogleConfig } from '../interfaces/google-config.interface';

export const DEFAULT_GOOGLE_CONFIG: IGoogleConfig = {
	key: 'google',
	title: 'Google OAuth 2',
	loginDialogUri: 'https://accounts.google.com/o/oauth2/v2/auth',
	clientID: '',
	clientSecret: '',
	callbackURL: '{host}/signin?provider=google', // auth/google/
	accessTokenUri: 'https://oauth2.googleapis.com/token',
	responseType: 'code',
	scopes: ['email', 'profile', 'openid'],
	grant_type: 'authorization_code',
	scopePrefix: 'openid',
	scopeDelimiter: ' ',
	requiredUrlParams: ['scope'],
	optionalUrlParams: ['display'],
	display: 'popup',
	type: '2.0',
	popupOptions: { width: 452, height: 633 },
};

export const GOOGLE_CONFIG_TOKEN = 'GoogleConfig';
