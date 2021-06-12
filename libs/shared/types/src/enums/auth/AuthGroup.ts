// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserRole } from './UserRole';

export const AuthGroups: Record<string, UserRole[]> = {
	admin    : [UserRole.Admin],
	staff    : [UserRole.Admin, UserRole.Staff],
	user     : [UserRole.Admin, UserRole.Staff, UserRole.User],
	onlyGuest: [],
	everyone: [null],
};
