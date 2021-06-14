// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserRoles } from './UserRoles';

export const AuthRoles: Record<string, UserRoles[]> = {
	admin    : [UserRoles.Admin],
	editor    : [UserRoles.Admin, UserRoles.Editor],
	user     : [UserRoles.Admin, UserRoles.Editor, UserRoles.User],
	onlyGuest: [],
	everyone: [null],
};
