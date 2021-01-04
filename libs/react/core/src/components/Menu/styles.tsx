import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Icon } from '../../components/Icon';
import { NavItemTypes } from '../../enums/NavItemTypes';
import { INavItem } from '../../interfaces/INavItem';

interface IMenuItemContainerProps {
	item: INavItem;
	children: JSX.Element | JSX.Element[];
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

export const MenuItemContainer = ({ item, children }: IMenuItemContainerProps) => {
	let Component;
	// const BadgeWrapper = styled.span`${(props) => getBadgeConfig(props)}`;
	switch (item.type) {
		case NavItemTypes.Route:
			Component = styled(Link)`
				${ baseMenuItemCss }
				${MenuItemIcon} {
					order: -1;
				}
			`;
			return (
				<Component to={item.route.path}>
					{ children }
				</Component>
			);
		case NavItemTypes.Link:
			Component = styled.a`
				font-size: 100%;
			`;
			return (
				<Component href={item.route.path} target={item.target}>
					{ children }
				</Component>
			);
		case NavItemTypes.Divider:
			Component = styled.span`
				${ baseMenuItemCss }
				padding: 0.5em 0 0.5em 1em;
			`;
			break;
		case NavItemTypes.Group:
			Component = styled.span.attrs({ 'data-menu-group': true })`
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
			break;
		default:
			return null;
	}

	return (
		<Component>
			{ children }
		</Component>
	);
};
