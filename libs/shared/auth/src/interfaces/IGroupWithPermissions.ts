import { IPermissionOutput } from './IPermissionOutput';

export interface IGroupWithPermissions {
	id: number;
	name: string;
	title: string;
	permissions: IPermissionOutput[];
}
