import { IUserProfile } from './IUserProfile';
import { IRoleWithPermissions } from './IRoleWithPermissions';

export interface ISignedUserOutput {
	id: number;
	lastLogin: Date;
	isSuperuser: boolean;
	username: string;
	email: string;
	isActive: boolean;
	dateJoined: Date
	roles: IRoleWithPermissions[];
	profile: IUserProfile;
}
