import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { toTitleCase, getUtcDate } from '@xapp/shared/utils';
import { ModuleAction, ModuleName, UserGroup } from '@xapp/shared/types';
import { UserProfile, User } from '@xapp/api/users';

import { Group, Permission } from '@xapp/api/access-control';

const ADMIN = 'admin';
const DEMO = 'demo';

const getUser = async (username: string, profile: Partial<UserProfile>, groups: Group[] = [], isSuperuser = false) => {
	const user = plainToClass(User, {
		username,
		email: `${username}@xapp.com`,
		isSuperuser,
		dateAccountVerified: getUtcDate(),
		isActive: true,
		dateJoined: getUtcDate(),
		hashedPassword: await User.createPassword(username),
		groups,
	});

	const userProfile = plainToClass(UserProfile, profile);
	userProfile.user = user;

	return { user, userProfile };
};

const getGroup = (name: UserGroup, permissions: Permission[]) => plainToClass(Group, {
	name,
	title: toTitleCase(name),
	permissions,
});

const getPermissions = (modules: ModuleName[]) =>
	modules.reduce((result, module) => {
		const allActions = Object
			.keys(ModuleAction)
			.filter((key) => isNaN(Number(ModuleAction[key])))
			.filter(Number)
			.map((action) => plainToClass(Permission, {
				action: Number(action) as ModuleAction,
				module,
				title: `${toTitleCase(ModuleAction[action])} ${module}`,
			}));

		return result.concat(allActions);
	}, [] as Permission[]);

export default class SeedAuth implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) => await connection
			.manager.save(entity, values) as Promise<T>;

		const permissions = getPermissions(Object.values(ModuleName));
		await execSave(Permission, permissions);

		const adminGroup = getGroup(UserGroup.Admin, permissions);
		await execSave(Group, adminGroup);

		const userPermissions = permissions.filter((p) => p.module === ModuleName.Todo);

		const userGroup = getGroup(UserGroup.User, userPermissions);
		await execSave(Group, userGroup);

		const admin = await getUser(ADMIN, { firstName: 'Admin', lastName: 'User', locale: 'CA' }, [adminGroup], true);
		await execSave(User, admin.user);
		await execSave(UserProfile, admin.userProfile);

		const demo = await getUser(DEMO, { firstName: 'Demo', lastName: 'User', locale: 'CA' }, [userGroup]);
		await execSave(User, demo.user);
		await execSave(UserProfile, demo.userProfile);
	}
}
