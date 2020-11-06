export interface IRestApiHeaderConfig {
	url: string;
	basePath: string;
	contentType: string;
	clientId: string;
	clientSecret?: string;
	scope?: string;
	protocol?: string;
	port?: string;
	grantType:  string;
	websocketEndpoint?: string;
	authHeader: string;
	authToken: string;
	authTokenKey: string;
	accessTokenStorageKey: string;
	userSettingsStorageKey: string;
	userInfoStorageKey: string;
}
