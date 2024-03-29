import { Operations, UserRoles } from '@xapp/shared/types';
import { IBaseControllerFactoryOpts } from './base.interface';

export type AuthConstraint = {
	roles?: UserRoles[];
	permissions: Operations[];
}

export interface IDefaultAuthObj {
	count?: AuthConstraint;
	updateOrCreate?: AuthConstraint;
	get?: AuthConstraint;
	getById?: AuthConstraint;
	create?: AuthConstraint;
	update?: AuthConstraint;
	delete?: AuthConstraint;
}

export interface IBaseAuthControllerFactoryOpts<T> extends IBaseControllerFactoryOpts<T> {
	auth?: IDefaultAuthObj;
}
