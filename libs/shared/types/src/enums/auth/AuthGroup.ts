// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserGroup } from './UserGroup';

export const AuthGroups: Record<string, UserGroup[]> = {
	admin    : [UserGroup.Admin],
	staff    : [UserGroup.Admin, UserGroup.Staff],
	user     : [UserGroup.Admin, UserGroup.Staff, UserGroup.User],
	onlyGuest: [],
	everyone: [null],
};
