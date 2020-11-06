import { UserGroup } from '@xapp/shared/enums';

export interface IAuthGroup {
	[role: string]: UserGroup[];
}
