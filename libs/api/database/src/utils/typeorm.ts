// import { FindOneOptions } from 'typeorm';
// import { Module, Group, Permission, User, UserProfile, Notification, LoggedIn, NotificationRead } from '@xapp/api/auth';
// import { generateErrors } from './validation';
// // import { EntityNotFoundError, BadUserInputError } from '@xapp/api/core';

// type EntityConstructor = typeof Module
// 	| typeof User
// 	| typeof Group
// 	| typeof Permission
// 	| typeof UserProfile
// 	| typeof Notification
// 	| typeof LoggedIn
// 	| typeof NotificationRead;

// type EntityInstance = Module | User | Group | Permission | UserProfile | Notification | LoggedIn | NotificationRead;

// const entities: { [key: string]: EntityConstructor } = {
// 	Permission,
// 	Group,
// 	Module,
// 	User,
// 	UserProfile,
// };

// export const findEntityOrThrow = async <T extends EntityConstructor>(
// 	Constructor: T,
// 	id: number | string,
// 	options?: FindOneOptions,
// ): Promise<InstanceType<T>> => {
// 	const instance = await Constructor.findOne(id, options);
// 	if (!instance) {
// 		throw new Error(Constructor.name);
// 	}

// 	return instance;
// };

// export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
// 	const Constructor = entities[instance.constructor.name];

// 	if ('validations' in Constructor) {
// 		const errorFields = generateErrors(instance, Constructor.validations);

// 		if (Object.keys(errorFields).length > 0) {
// 			throw new Error(errorFields.toString());
// 		}
// 	}
// 	return instance.save() as Promise<T>;
// };

// export const createEntity = async <T extends EntityConstructor>(
// 	Constructor: T,
// 	input: Partial<InstanceType<T>>,
// ): Promise<InstanceType<T>> => {
// 	const instance = Constructor.create(input);
// 	return validateAndSaveEntity(instance as InstanceType<T>);
// };

// export const updateEntity = async <T extends EntityConstructor>(
// 	Constructor: T,
// 	id: number | string,
// 	input: Partial<InstanceType<T>>,
// ): Promise<InstanceType<T>> => {
// 	const instance = await findEntityOrThrow(Constructor, id);
// 	Object.assign(instance, input);
// 	return validateAndSaveEntity(instance);
// };

// export const deleteEntity = async <T extends EntityConstructor>(
// 	Constructor: T,
// 	id: number | string,
// ): Promise<InstanceType<T>> => {
// 	const instance = await findEntityOrThrow(Constructor, id);
// 	await instance.remove();
// 	return instance;
// };
