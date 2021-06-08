import { IDefaultAuthObj } from './base-auth.interface';

const defaultAuthConstraint = {
	roles: [],
	permissions: [],
};

export const defaultAuthObj: IDefaultAuthObj = {
	getById: defaultAuthConstraint,
	create: defaultAuthConstraint,
	updateOrCreate: defaultAuthConstraint,
	update: defaultAuthConstraint,
	delete: defaultAuthConstraint,
	count: defaultAuthConstraint,
};

export const getAuthConstraints = (authObj: IDefaultAuthObj | null = null): IDefaultAuthObj => {
	let auth = null;

	if (authObj !== null) {
		auth = {
			...defaultAuthObj,
			...authObj,
		};
	}

	return auth;
};
