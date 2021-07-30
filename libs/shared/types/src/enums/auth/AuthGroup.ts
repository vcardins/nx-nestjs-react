import { UserRoles } from './UserRoles';

export const AuthGroups: Record<string, UserRoles[]> = {
	Admin: [UserRoles.Admin],
	Editor: [UserRoles.Admin, UserRoles.Editor],
	User: [UserRoles.Admin, UserRoles.User],
	Guest: [],
};
