import { UserGroup } from '@xapp/shared/enums';
import { IGroupWithPermissions } from '@xapp/shared/interfaces';

export function hasRoutePermission(authArr: UserGroup[], userGroups: IGroupWithPermissions[] = []) {
	/**
	 * If auth array is not defined
	 * Pass and allow
	 */
	if ( authArr === null || authArr === undefined ) {
		// console.info("auth is null || undefined:", authArr);
		return true;
	}
	/**
	 * if auth array is empty means,
	 * allow only user role is guest (null or empty[])
	 */
	else if ( authArr.length === 0 ) {
		// console.info("auth is empty[]:", authArr);
		return userGroups.length === 0;
	}
	/**
	 * Check if user has grants
	 */
	/*
	Check if the only value is null, which means that
	the permission is granted regardless of user role
	*/
	if ( authArr.length === 1 && authArr[0] === null ) {
		return true;
	}

	if ( !userGroups.length ) {
		return false;
	}

	/*
	Check if user role is array,
	*/
	return authArr.some((r) => userGroups.find((group) => group.name.indexOf(r) >= 0));
}
