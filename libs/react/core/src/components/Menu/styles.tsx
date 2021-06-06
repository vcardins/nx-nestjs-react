import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { INavItem, NavItemTypes } from '@xapp/shared/types';
import { Icon } from '../../components/Icon';

interface IMenuItemContainerProps {
	item: INavItem;
	children: React.ReactNode;
}

interface IMenuGroupProps {
	isHeading?: boolean;
	collapsed?: boolean;
}

const baseMenuItemCss = css`
	display: flex;
	flex-direction: column;
`;

export const MenuItemTitle = styled.span`
	display: block;
	line-height: 1;
	opacity: 1;
	white-space: nowrap;
`;

export const MenuItemIcon = styled(Icon)`
	order: -1;
`;

export const MenuItemBadge = styled.span`
	font-size: 14px;
`;

export const MenuItem = styled.li<{ isHeading?: boolean }>`
	font-size: 14px;
	${({ isHeading }) => isHeading && css`
		:last-child {
			align-content: flex-end;
		}
	`}
	${({ isHeading }) => !isHeading && css`
		${MenuItemTitle} {
			margin-left: 15px;
		}

		&:hover {
			text-decoration: none;
			background-color: rgba(255, 255, 255, 0.15);
		}
	`}

	a {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 6px 15px;
	}
`;

export const MenuGroup = styled.ul<IMenuGroupProps>`
	list-style: none;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

export const MenuContainer = styled.div`
	overflow-x: hidden;
	width: 100%;
`;

const NavItemDivider = styled.span`
	${ baseMenuItemCss }
	padding: 0.5em 0 0.5em 1em;
`;

const NavItemLink = styled.a`
	font-size: 100%;
`;

const NavItemGroup = styled.span.attrs({ 'data-menu-group': true })`
	font-weight: bold;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 16px 10px;
	color: rgba(255, 255, 255, 0.5);
	text-transform: uppercase;
	font-size: 14px;
`;

const NavItemRoute = styled(Link)`
	${ baseMenuItemCss }
	${MenuItemIcon} {
		order: -1;
	}
`;

export const MenuItemContainer = ({ item, children }: IMenuItemContainerProps) => {
	// const BadgeWrapper = styled.span`${(props) => getBadgeConfig(props)}`;
	switch (item.type) {
		case NavItemTypes.Route:
			return (
				<NavItemRoute to={item.route.path}>
					{ children }
				</NavItemRoute>
			);
		case NavItemTypes.Link:
			return (
				<NavItemLink href={item.route.path} target={item.target}>
					{ children }
				</NavItemLink>
			);
		case NavItemTypes.Divider:
			return (
				<NavItemDivider>
					{ children }
				</NavItemDivider>
			);
		case NavItemTypes.Group:
			return (
				<NavItemGroup>
					{ children }
				</NavItemGroup>
			);
		default:
			return null;
	}
};
