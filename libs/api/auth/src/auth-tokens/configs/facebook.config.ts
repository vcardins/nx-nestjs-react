/* eslint-disable camelcase */
import { IFacebookConfig } from '../interfaces/facebook-config.interface';

export const DEFAULT_FACEBOOK_CONFIG: IFacebookConfig = {
	key: 'facebook',
	title: 'Facebook',
	loginDialogUri: 'https://www.facebook.com/v2.12/dialog/oauth',
	accessTokenUri: 'https://graph.facebook.com/v2.12/oauth/access_token',
	clientID: '',
	clientSecret: '',
	callbackURL: '',
	scopes: ['email'],
	scopeDelimiter: ',',
	requiredUrlParams: ['nonce', 'display', 'scope'],
	display: 'popup',
	type: '2.0',
	popupOptions: { width: 580, height: 400 },
	state: '{fbstate}',
};
export const FACEBOOK_CONFIG_TOKEN = 'FacebookConfig';
