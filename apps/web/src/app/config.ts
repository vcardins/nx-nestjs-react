/* eslint-disable camelcase */
import { ic_fingerprint } from 'react-icons-kit/md/ic_fingerprint';
import { ic_person_pin } from 'react-icons-kit/md/ic_person_pin';
import { ic_done } from 'react-icons-kit/md/ic_done';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_security } from 'react-icons-kit/md/ic_security';
/* eslint-enable camelcase */

import {
	IKeyedRoute, INavItem, IGroupWithPermissions,
	NavItemTypes, PageKey, AuthGroups,
} from '@xapp/shared/types';
import { hasRoutePermission, generateRoutes } from '@xapp/shared/utils';

import { pagesConfigs } from './pages/@config';

export const routes = generateRoutes(pagesConfigs, AuthGroups.user);

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
					title: 'User Profile',
					type: NavItemTypes.Route,
					icon: ic_person_pin,
					route: routes[PageKey.UserProfile],
				},
				{
					id: getNavId('change-password'),
					title: 'Change Password',
					type: NavItemTypes.Route,
					icon: ic_fingerprint,
					route: routes[PageKey.ChangePassword],
				},
			],
		},
		{
			id: getNavId('admin'),
			title: 'Admin',
			type: NavItemTypes.Route,
			icon: ic_security,
			route: routes[PageKey.Admin],
		},
		{
			id: getNavId('household'),
			title: 'Household',
			type: NavItemTypes.Route,
			icon: ic_home,
			route: routes[PageKey.Household],
		},
		{
			id: getNavId('todo'),
			title: 'Todo',
			type: NavItemTypes.Route,
			icon: ic_done,
			route: routes[PageKey.Todo],
		},
	];

	return navigation.reduce((result: INavItem[], nav: INavItem) => {
		if (nav?.route?.auth) {
			if (hasRoutePermission(nav.route.auth, userGroups)) {
				result.push(nav);
			}
		} else {
			if (nav?.children) {
				nav.children = nav.children.filter((childNav) =>
					childNav?.route?.auth ? hasRoutePermission(childNav.route.auth, userGroups) : true
				);
			}
			result.push(nav);
		}

		return result;
	}, []);
}
