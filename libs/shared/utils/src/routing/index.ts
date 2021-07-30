import { defaultPageLayout } from '@xapp/shared/config';
import { UserRoles, IPageConfig, IKeyedRoute, IRoleWithPermissions } from '@xapp/shared/types';

export function hasRoutePermission(authArr: UserRoles[], userRoles: IRoleWithPermissions[] = []) {
	/**
	 * If auth array is not defined
	 * Pass and allow
	 */
	if ( authArr === null || authArr === undefined ) {
		return true;
	}
	/**
	 * if auth array is empty means,
	 * allow only user role is guest (null or empty[])
	 */
	else if ( authArr.length === 0 ) {
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

function prepareRoutes(config: IPageConfig, allowedRoles: IRoleWithPermissions[] = []) {
	return config.routes.reduce((result, route) => {
		const auth = route.auth ? route.auth : (config.auth || []);
		// const isAllowed = hasRoutePermission(auth, allowedRoles);
		// if ( isAllowed ) {
		result[route.key] = {
			...route,
			layout: { ...defaultPageLayout, ...config.layout },
			auth,
		};
		// }

		return result;
	}, {} as IKeyedRoute);
}

export function generateRoutes(pagesConfig: IPageConfig[], allowedRoles: IRoleWithPermissions[]) {
	// We could have used Array.flatMap instead but it doesn't work on IE
	return pagesConfig.reduce((result: IKeyedRoute, config: IPageConfig) => {
		const routes = prepareRoutes(config, allowedRoles);
		// eslint-disable-next-line no-param-reassign
		result = {
			...result,
			...routes,
		};
		return result;
	}, {} as IKeyedRoute);
}
