/* eslint-disable camelcase */
import React, { useState } from 'react';
import screenfull from 'screenfull';
import Icon from 'react-icons-kit';

import { ic_fullscreen } from 'react-icons-kit/md/ic_fullscreen';
import { ic_fullscreen_exit } from 'react-icons-kit/md/ic_fullscreen_exit';
import { ic_exit_to_app } from 'react-icons-kit/md/ic_exit_to_app';
import { ic_close } from 'react-icons-kit/md/ic_close';
import { ic_expand_less } from 'react-icons-kit/md/ic_expand_less';
import { ic_expand_more } from 'react-icons-kit/md/ic_expand_more';
import { ic_apps } from 'react-icons-kit/md/ic_apps';

import { Suspense } from '../../Suspense';
import { Avatar } from '../../Avatar';

import { ILayoutProps } from '../ILayoutProps';

import {
	Container,
	Header,
	Main,
	Sidenav,
	Brand,
	Profile,
	ActionLink,
} from './styles';

export const HolyGrailLayout = (props: ILayoutProps) => {
	const {
		renderedRoutes,
		activeRoute,
		userMenu,
		sideMenu,
		user,
		onSignOut,
	} = props;
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isSidenavActive, setSidenavActive] = useState(false);
	const [isSidenavCollapsed, setSidenavCollapsed] = useState(false);

	function onToggleFullscreen () {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		screenfull.toggle();
		// Switch icon indicator
		setIsFullscreen(!isFullscreen);
	}

	return (
		<Container id="layout-container" data-sidenav-collapsed={isSidenavCollapsed}>
			<Header.Container id="header-container">
				<Header.Menu id="header-menu" onClick={() => setSidenavActive(true)}>
					<a
						onClick={() => setSidenavCollapsed(!isSidenavCollapsed)}
						title={isSidenavCollapsed ? 'Expand' : 'Collapse'}
					>
						<ActionLink.Icon
							data-title={isSidenavCollapsed ? 'Expand' : 'Collapse'}
							icon={isSidenavCollapsed ? ic_expand_less : ic_expand_more}
							size={1}
						/>
					</a>
				</Header.Menu>
				<Header.Search id="header-search">
					<input placeholder="Search..." />
				</Header.Search>
				<Header.Profile>
					{ userMenu }
				</Header.Profile>
			</Header.Container>
			<Sidenav.Container id="sidenav-container" data-sidenav-active={isSidenavActive}>
				<Sidenav.Brand id="sidenav-brand">
					<Brand.Icon
						icon={ic_apps}
						aria-hidden="true"
						size={24}
					/>
					<Brand.Link id="sidenav-brand-link" to="/">
						{activeRoute.title}
					</Brand.Link>
					<Brand.Close
						id="sidenav-brand-close"
						onClick={() => setSidenavCollapsed(true)}
					>
						<Icon
							icon={ic_close}
							aria-hidden="true"
						/>
					</Brand.Close>
				</Sidenav.Brand>
				<Sidenav.Profile id="sidenav-profile">
					<Avatar
						id="profile-avatar"
						size={36}
						avatar={user?.profile?.firstName}
					/>
					<Profile.NameContainer>
						<Profile.Name id="profile-user-name">
							{user?.profile?.firstName}
						</Profile.Name>
					</Profile.NameContainer>
				</Sidenav.Profile>
				<Sidenav.Menu id="sidenav-menu">
					{ sideMenu }
				</Sidenav.Menu>
				<Sidenav.Footer id="sidenav-footer">
					<a
						onClick={ onToggleFullscreen }
						title="Fullscreen"
						data-sidenav-action-visible="toggle-fullscreen"
					>
						<ActionLink.Icon
							data-title="Fullscreen"
							icon={!isFullscreen ? ic_fullscreen : ic_fullscreen_exit}
						/>
					</a>
					<a
						onClick={onSignOut}
						title="Sign Out"
					>
						<ActionLink.Icon
							data-title="Sign Out"
							icon={ic_exit_to_app}
						/>
					</a>
				</Sidenav.Footer>
			</Sidenav.Container>
			<Main id="main-container">
				<Suspense>
					{renderedRoutes}
				</Suspense>
			</Main>
		</Container>
	);
};
