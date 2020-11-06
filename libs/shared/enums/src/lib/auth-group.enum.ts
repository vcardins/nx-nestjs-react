// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserGroup } from './user-group.enum';

export const AuthGroups: { [key: string]: UserGroup[] } = {
	admin    : [UserGroup.Admin],
	staff    : [UserGroup.Admin, UserGroup.Staff],
	user     : [UserGroup.Admin, UserGroup.Staff, UserGroup.User],
	onlyGuest: [],
	everyone: [null],
};
