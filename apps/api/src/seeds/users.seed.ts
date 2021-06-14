import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, EntityTarget } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { toTitleCase, getUtcDate } from '@xapp/shared/utils';
import { Operations, Resources, UserRoles } from '@xapp/shared/types';
import { UserProfile, User } from '@xapp/api/access-control';

import { Role, Permission, Operation, Resource } from '@xapp/api/access-control';

const ADMIN = 'admin';
const DEMO = 'demo';

const getUser = async (username: string, profile: Partial<UserProfile>, roles: Role[] = [], isSuperuser = false) => {
	const user = plainToClass(User, {
		username,
		email: `${username}@xapp.com`,
		isSuperuser,
		dateAccountVerified: getUtcDate(),
		isActive: true,
		dateJoined: getUtcDate(),
		hashedPassword: await User.createPassword(username),
		roles,
	});

	const userProfile = plainToClass(UserProfile, profile);
	userProfile.user = user;

	return { user, userProfile };
};

const getPermissions = (resources: Resource[], operations: Operation[]) =>
	resources.reduce((result, resource) => {
		const allActions = operations.map((operation) =>
			plainToClass(Permission, {
				resource,
				operation,
				name: `${toTitleCase(operation.name)} ${resource.name}`,
			}),
		);

		return result.concat(allActions);
	}, [] as Permission[]);

export default class SeedAuth implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		const execSave = async <T>(entity: EntityTarget<T>, values: any) =>
			(await connection.manager.save(entity, values)) as Promise<T[]>;
		const execGet = async <T>(entity: EntityTarget<T>) => connection.manager.find(entity);
		const operationsModels = Object.keys(Operations).map((description) => ({
			name: Operations[description],
			description,
		}));
		const operations = await execSave(Operation, operationsModels); // (await execGet(Operation)) ?? (

		const resourcesModels = Object.keys(Resources).map((description) => ({ name: Resources[description], description }));
		const resources = await execSave(Resource, resourcesModels); // (await execGet(Resource)) ?? (

		const adminPermissions = getPermissions(resources, operations);

		await execSave(Permission, adminPermissions);

		const rolesModels = Object.keys(UserRoles)
			.filter(Number)
			.map((id) => ({
				id: Number(id),
				name: UserRoles[id] as string,
				permissions: adminPermissions,
			}));

		const roles = await execSave(Role, rolesModels);

		const adminRole = roles.find(({ id }) => id === UserRoles.Admin);
		// await execSave(Role, adminRole);
		const userRole = roles.find(({ id }) => id === UserRoles.User);
		//{
		// 	...roles.find(({ id }) => id === UserRoles.User),
		// 	permissions: adminPermissions.filter(()),
		// };
		// await execSave(Role, userRole);

		// const userRole = getRole(UserRoles.User, userPermissions);
		// await execSave(Role, userRole);

		const admin = await getUser(ADMIN, { firstName: 'Admin', lastName: 'User', locale: 'CA' }, [adminRole], true);
		await execSave(User, admin.user);
		await execSave(UserProfile, admin.userProfile);

		const demo = await getUser(DEMO, { firstName: 'Demo', lastName: 'User', locale: 'CA' }, [userRole]);
		await execSave(User, demo.user);
		await execSave(UserProfile, demo.userProfile);
	}
}
