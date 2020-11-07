import { ModuleAction } from '@xapp/shared/enums';
import { IBaseControllerFactoryOpts } from './base.interface';

type AuthConstraint = {
	roles?: string[];
	permissions: ModuleAction[];
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
