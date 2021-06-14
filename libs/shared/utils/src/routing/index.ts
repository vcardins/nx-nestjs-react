import { defaultPageLayout } from '@xapp/shared/config';
import { UserRoles, IPageConfig, IKeyedRoute, IRoleWithPermissions } from '@xapp/shared/types';

function getRoutes(config: IPageConfig, allowedGroups: UserRoles[] = null) {
	return config.routes.reduce((result, route) => {
		const auth = config.auth || allowedGroups;

		result[route.key] = {
			...route,
			layout: { ...defaultPageLayout, ...config.layout },
			auth: route.auth
				? [...auth, ...route.auth]
				: auth,
		};

		return result;
	}, {} as IKeyedRoute);
}

export function hasRoutePermission(authArr: UserRoles[], userRoles: IRoleWithPermissions[] = []) {
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
		return userRoles.length === 0;
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

	if ( !userRoles.length ) {
		return false;
	}

	/*
	Check if user role is array,
	*/
	return authArr.some((r) => userRoles.find((role) => role.id === r));
}

export function generateRoutes(pagesConfig: IPageConfig[], allowedGroups: UserRoles[]) {
	// We could have used Array.flatMap instead but it doesn't work on IE
	return pagesConfig.reduce((result: IKeyedRoute, config: IPageConfig) => {
		const routes = getRoutes(config, allowedGroups);
		// eslint-disable-next-line no-param-reassign
		result = {
			...result,
			...routes,
		};
		return result;
	}, {} as IKeyedRoute);
}
