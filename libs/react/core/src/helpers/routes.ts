import { UserGroup } from '@xapp/shared/auth';

import { IPageConfig } from '../interfaces/IPageConfig';
import { IKeyedRoute } from '../interfaces/IRoute';
import { defaultPageLayout } from '../config/DefaultPageLayout';

function getRoutes(config: IPageConfig, allowedGroups: UserGroup[] = null) {
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

export function generateRoutes(pagesConfig: IPageConfig[], allowedGroups: UserGroup[]) {
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
