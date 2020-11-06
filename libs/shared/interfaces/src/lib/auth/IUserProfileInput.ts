import { IUserPreferences } from './IUserPreferences';

export interface IUserProfileInput {
	firstName?: string;
	lastName?: string;
	mobile?: string;
	bio?: string;
	dateOfBirth?: string;
	pictureUrl: string;
	locale?: string;
	preferences?: IUserPreferences;
}
