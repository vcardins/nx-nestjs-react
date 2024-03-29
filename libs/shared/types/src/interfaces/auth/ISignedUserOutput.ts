import { IUserProfile } from './IUserProfile';
import { IRoleWithPermissions } from './IRoleWithPermissions';

export interface ISignedUserOutput {
	id: number;
	lastLogin: Date;
	isSuperuser: boolean;
	email: string;
	isActive: boolean;
	joinedAt: Date
	roles: IRoleWithPermissions[];
	profile: IUserProfile;
}
