import { UserRoles } from '../../enums';
import { IPermissionOutput } from './IPermissionOutput';

export interface IRoleWithPermissions {
	id: UserRoles;
	name: string;
	title: string;
	permissions: IPermissionOutput[];
}
