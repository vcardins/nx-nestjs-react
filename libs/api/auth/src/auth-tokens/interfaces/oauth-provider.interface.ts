/* eslint-disable camelcase */
export interface IOAuthProvider {
	readonly key: string;
	readonly title: string;
	readonly loginDialogUri?: string;
	readonly accessTokenUri?: string;
	readonly callbackURL: string;
	readonly clientSecret: string;
	readonly clientID: string;
	scopeDelimiter?: string;
	display?: string;
	type?: string;
	requiredUrlParams?: string[];
	optionalUrlParams?: string[];
	scopes: string[];
	state?: string;
	responseType?: string;
	scopePrefix?: string;
	popupOptions: { width: number; height }
}
