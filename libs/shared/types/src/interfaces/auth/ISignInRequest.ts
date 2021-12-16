import { ISignInInput } from './ISignInInput';

export interface ISignInRequest extends ISignInInput {
	grant_type: string;
	client_id: string;
	client_secret: string;
	scope: string;
}
