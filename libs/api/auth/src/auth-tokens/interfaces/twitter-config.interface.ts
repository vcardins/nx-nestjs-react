import { IOAuthProvider } from './oauth-provider.interface';
/* eslint-disable camelcase */
export interface ITwitterConfig extends IOAuthProvider {
	readonly responseType: string;
	readonly scopes: string[];
	readonly grant_type: string;
}
