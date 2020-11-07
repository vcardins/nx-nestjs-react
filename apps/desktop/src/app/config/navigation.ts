import { IKeyedRoute, INavItem, NavItemTypes, PageKey } from '@xapp/react/core';
import { hasRoutePermission } from '@xapp/react/auth';
import { IGroupWithPermissions } from '@xapp/shared/interfaces';

const getNavId = (key: string) => `nav-item-${key}`;

export function getNavigation(routes: IKeyedRoute, userGroups: IGroupWithPermissions[]) {
	const navigation: INavItem[] = [
		{
			id: getNavId('user-account'),
			title: 'User Account',
			type: NavItemTypes.Group,
			icon: 'account_box',
			children: [
				{
					id: getNavId('user-profile'),
					title: 'User Profiles',
					type: NavItemTypes.Route,
					icon: 'face',
					route: routes[PageKey.UserProfile],
				},
				{
					id: getNavId('change-password'),
					title: 'Change Password',
					type: NavItemTypes.Route,
					icon: 'fingerprint',
					route: routes[PageKey.ChangePassword],
				},
			],
		},
		{
			id: getNavId('admin'),
			title: 'Admin',
			type: NavItemTypes.Route,
			icon: 'beenhere',
			route: routes[PageKey.Admin],
		},
		{
			id: getNavId('todo'),
			title: 'Todo',
			type: NavItemTypes.Route,
			icon: 'beenhere',
			route: routes[PageKey.Todo],
		},
	];

	return navigation.reduce((result: INavItem[], nav: INavItem) => {
		if (nav?.route?.auth) {
			if (hasRoutePermission(nav.route.auth, userGroups)) {
				result.push(nav);
			}
		}
		else {
			if (nav?.children) {
				nav.children = nav.children.filter((childNav) =>
					childNav?.route?.auth
						? hasRoutePermission(childNav.route.auth, userGroups)
						: true,
				);
			}
			result.push(nav);
		}

		return result;
	}, []);
}
