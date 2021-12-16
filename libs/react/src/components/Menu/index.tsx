/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from 'react';
import { INavItem, NavItemTypes } from '@xapp/shared/types'; //NavItemTypes

import {
	MenuGroup,
	SubMenuGroup,
	Arrow,
	Item,
	Label,
	LI,
	UL,
	NavItemDivider,
	NavItemLink,
	NavItemGroup,
	NavItemRoute,
} from './styles';

interface IMenuProps {
	collapsed?: boolean;
	items: INavItem[];
	position?: string;
	activeItem?: string;
	trigger?: string;
}

interface IListMenu {
	id?: string;
	dept: number;
	item: INavItem;
	isExpanded?: boolean | null;
	menuIndex: number;
}

interface IListSubMenu extends Omit<IListMenu, 'item' | 'key'> {
	items: INavItem[];
}

interface IMenuItemContainerProps {
	item: INavItem;
	children: React.ReactNode;
}

export const MenuItemContainer = ({ item, children }: IMenuItemContainerProps) => {
	switch (item.type) {
		case NavItemTypes.Route:
			return <NavItemRoute to={item.route.path}>{children}</NavItemRoute>;
		case NavItemTypes.Link:
			return (
				<NavItemLink href={item.route.path} target={item.target}>
					{children}
				</NavItemLink>
			);
		case NavItemTypes.Divider:
			return <NavItemDivider>{children}</NavItemDivider>;
		case NavItemTypes.Group:
			return <NavItemGroup>{children}</NavItemGroup>;
		default:
			return null;
	}
};

export const Menu = (props: IMenuProps) => {
	const { items } = props;
	const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

	const handleToggleMenu = (menuKey: string) => {
		const newActiveMenus = [...expandedMenus];

		if (newActiveMenus.includes(menuKey)) {
			const index = newActiveMenus.indexOf(menuKey);
			if (index > -1) {
				newActiveMenus.splice(index, 1);
			}
		}
		else {
			newActiveMenus.push(menuKey);
		}

		setExpandedMenus(newActiveMenus);
	};

	const ListMenu = ({ dept, item, id, menuIndex }: IListMenu) => {
		return (
			<LI key={id}>
				<MenuItemContainer item={item}>
					<Item
						dept={dept}
						data-active={expandedMenus.includes(id)}
						onClick={() => item.children?.length ? handleToggleMenu(id) : undefined}
					>
						<Label>{item.label} </Label>
						{item.children?.length && (
							<Arrow toggle={expandedMenus.includes(id)} />
						)}
					</Item>
					{item.children?.length && (
						<SubMenu
							dept={dept}
							items={item.children}
							isExpanded={expandedMenus.includes(id)}
							menuIndex={menuIndex}
						/>
					)}
				</MenuItemContainer>
			</LI>
		);
	};

	const SubMenu = ({ dept, items, isExpanded, menuIndex }: IListSubMenu) => {
		const getKey = (index: number) => `sidebar-submenu-${dept + 1}-${menuIndex}-${index}`;

		return (
			<SubMenuGroup>
				<UL
					isVisible={isExpanded}
					key={`${getKey(menuIndex)}-parent`}
					data-visible={isExpanded}
				>
					{items.map((menu, index) => {
						const id = getKey(index);

						return (
							<ListMenu
								id={id}
								key={id}
								dept={dept + 1}
								item={menu}
								menuIndex={index}
							/>
						);
					})}
				</UL>
			</SubMenuGroup>
		);
	};

	return (
		<MenuGroup>
			<UL isVisible={true} data-visible="true">
				{items.map((menu, index) => {
					const dept = 1;
					const menuKey = `menu-${dept}-${index}`;

					return (
						<ListMenu
							id={menuKey}
							key={menuKey}
							dept={dept}
							item={menu}
							menuIndex={index}
						/>
					);
				})}
			</UL>
		</MenuGroup>
	);
};
