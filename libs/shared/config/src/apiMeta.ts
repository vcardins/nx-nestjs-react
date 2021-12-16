import { IAppConfig } from '@xapp/shared/types';

const CODE = 'app';
const {
	CLIENT_ID,
	CLIENT_SECRET,
	// WEBSOCKET_URL,
	// PROTOCOL,
	// PORT,
} = process.env;

const basePath = '/api';
const protocol = 'http';
const domain = 'localhost';
const port = '3333';

const fullUrl = `${domain}${port ? `:${port}` : ''}`;
const baseUrl = `${protocol}://${fullUrl}`;
const url = `${baseUrl}${basePath}`;

export const ApiMeta = (): IAppConfig['apiMeta'] => ({
	url,
	basePath,
	contentType: 'application/json',
	grantType: 'password',
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	scope: 'api',
	accessTokenStorageKey: `${CODE}_access_token`,
	authTokenKey: 'access_token',
	userSettingsStorageKey: `${CODE}_settings`,
	userInfoStorageKey: `${CODE}_user`,
	authToken: 'Bearer',
	websocketEndpoint: fullUrl,
});

export const apiMeta = ApiMeta();
