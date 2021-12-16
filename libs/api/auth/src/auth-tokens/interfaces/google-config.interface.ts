import { IOAuthProvider } from './oauth-provider.interface';
/* eslint-disable camelcase */
export interface IGoogleConfig extends IOAuthProvider {
	readonly responseType: string;
	readonly scopes: string[];
	readonly grant_type: string;
}
