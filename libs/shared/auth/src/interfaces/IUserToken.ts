import { ISignedUserOutput } from './ISignedUserOutput';

export interface IUserToken {
	// eslint-disable-next-line camelcase
	access_token: string;
	user: ISignedUserOutput;
}
