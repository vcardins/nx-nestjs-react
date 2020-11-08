import { IUserProfile } from './IUserProfile';
import { IGroupWithPermissions } from './IGroupWithPermissions';

export interface ISignedUserOutput {
	id: number;
	lastLogin: Date;
	isSuperuser: boolean;
	username: string;
	email: string;
	isActive: boolean;
	dateJoined: Date
	groups: IGroupWithPermissions[];
	profile: IUserProfile;
}
