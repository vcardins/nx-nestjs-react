import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';

const commonPadding = css`
	padding: 0 ${({ theme }) => theme.spacing.normal };
`;

const SidenavContainer = styled.aside`
	position: fixed;
	display: flex;
	flex-direction: column;
	grid-area: sidenav;
	height: 100vh;
	overflow: hidden;
	width: ${({ theme }) => theme.sizes.sideNav.expanded };
	background-color: ${({ theme }) => theme.colors.primary.blue };
	color: ${({ theme }) => theme.colors.primary.white};
	transform: translateX(-245px);
	transition: all 0.6s ease-in-out;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
	z-index: 2;

	&[data-sidenav-active="true"] {
		transform: translateX(0);
	}
`;

const SidenavBrand = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	height: ${({ theme }) => theme.sizes.header.height};
	background-color: rgba(0, 0, 0, 0.15);
	white-space: nowrap;
	${commonPadding}
`;

const SidenavProfile = styled.div`
	display: flex;
	align-items: center;
	height: ${({ theme }) => theme.sizes.sideNav.profile };
	background-color: rgba(255, 255, 255, 0.1);
	white-space: nowrap;
	${commonPadding}
`;

const SidenavMenu = styled.div`
	display: flex;
	overflow: auto;
	flex: 1;
`;

const SidenavFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${({ theme }) => theme.sizes.sideNav.footer };
	background-color: rgba(255, 255, 255, 0.1);
	${commonPadding}

	a {
		cursor: pointer;
		line-height: 0;
	}
`;

export const Sidenav = {
	Container: SidenavContainer,
	Brand: SidenavBrand,
	Profile: SidenavProfile,
	Menu: SidenavMenu,
	Footer: SidenavFooter,
};

/* Brand Styles */
const BrandIcon = styled(Icon).attrs<{id: string}>(({id}) => ({id}))`
	margin-top: 2px;
	color: rgba(255, 255, 255, 0.75);
`;

const BrandLink = styled(Link)`
	font-size: 16px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.primary.white};
	margin: 0 0 0 15px;
`;

const BrandClose = styled.span`
	position: absolute;
	right: 8px;
	top: 8px;
	visibility: visible;
	color: rgba(255, 255, 255, 0.25);
	cursor: pointer;
`;

export const Brand = {
	Icon: BrandIcon,
	Link: BrandLink,
	Close: BrandClose,
};

/* profile Styles */

const ProfileNameContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-left: ${({ theme }) => theme.spacing.normal };
`;

const ProfileName = styled.div`
	font-size: 14px;
	color: ${({ theme }) => theme.colors.primary.white};
	margin: 0;
`;

const ProfileShortcuts = styled.div`
	color: rgba(255, 255, 255, 0.25);
`;

export const Profile = {
	Name: ProfileName,
	NameContainer: ProfileNameContainer,
	Shortcuts: ProfileShortcuts,
};

type TypeId = {id?: string};

/* Link Styles */
const ActionIcon = styled(Icon).attrs<TypeId>(({id}) => ({id}))`
	color: rgba(255, 255, 255, 0.75);
`;

const ActionAnchor = styled(Link)`
	font-size: 18px;
	font-weight: bold;
	color: ${({ theme }) => theme.colors.primary.white};
	margin: 0 15px;
	letter-spacing: 1.5px;
`;

export const ActionLink = {
	Icon: ActionIcon,
	Link: ActionAnchor,
};
