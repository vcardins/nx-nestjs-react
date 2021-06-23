import { INavItem, NavItemTypes } from '@xapp/shared/types'; //NavItemTypes
import React, { useState } from 'react';

import {
	Arrow,
	Item,
	Label,
	LI,
	UL,
	NavItemDivider,
	NavItemLink,
	NavItemGroup,
	NavItemRoute,
	// MenuItemBadge,
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
	// const BadgeWrapper = styled.span`${(props) => getBadgeConfig(props)}`;
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

	// const handleMenuClick = (item: INavItem) => {
	// 	console.log(item);
	// };

	const handleArrowClick = (menuKey: string) => {
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

	const ListMenu = ({ dept, item, id, menuIndex }: IListMenu) => (
		<LI key={id}>
			<MenuItemContainer item={item}>
				<Item dept={dept} data-active={expandedMenus.includes(id)}>
					<Label>{item.label} </Label>
					{!!item.children?.length && (
						<Arrow
							onClick={() => handleArrowClick(id)}
							toggle={expandedMenus.includes(id)}
						/>
					)}
				</Item>
				{!!item.children?.length && (
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

	function SubMenu ({ dept, items, isExpanded, menuIndex }: IListSubMenu) {
		const getKey = (index: number) => `sidebar-submenu-${dept + 1}-${menuIndex}-${index}`;

		return (
			<UL isVisible={isExpanded} key={`${getKey(menuIndex)}-parent`}>
				{items.map((menu, index) => {
					return (
						<ListMenu
							dept={dept + 1}
							item={menu}
							key={getKey(index)}
							menuIndex={index}
						/>
					);
				})}
			</UL>
		);
	}

	return (
		<UL isVisible={true}>
			{items.map((menu, index) => {
				const dept = 1;
				const menuKey = `menu-${dept}-${index}`;

				return (
					<ListMenu
						dept={dept}
						item={menu}
						key={menuKey}
						menuIndex={index}
					/>
				);
			})}
		</UL>
	);
};

// export const Menu = (props: IMenuProps) => {
// 	const { position = 'vertical', collapsed/*trigger = 'click', activeItem */ } = props;

// 	// function triggerMenu ({ target }: React.MouseEvent<HTMLElement>, href: Function): void {
// 	// 	event.stopPropagation();
// 	// 	const el = target.closest('.menu-item');
// 	// 	const elParent = el.closest('.menu-parent');
// 	// 	const elParentId = elParent ? elParent.getAttribute('id') : undefined;

// 	// 	if (pinedItems.length) {
// 	// 		pinedItems.forEach(({id, el}) => elParentId ? id !== elParentId : true && el.classList.remove('expanded'));
// 	// 	}

// 	// 	if (elParent === el) {
// 	// 		elParent.classList.toggle('expanded');
// 	// 		pinedItems.push({ id: elParentId, el: elParent });
// 	// 	} else {
// 	// 		if (typeof href === 'function') {
// 	// 			href();
// 	// 		} else {
// 	// 			onRouteChange(href);
// 	// 		}
// 	// 	}
// 	// }
// 	function buildParentLevel(items: INavItem[], isHeading = false) {
// 		const rootProps = isHeading && { className: `nav-main nav-main--${position} nav-main--${collapsed ? 'collapsed' : 'expanded'}` };

// 		return (
// 			<MenuGroup
// 				{...rootProps}
// 				collapsed={collapsed}
// 				isHeading={isHeading}
// 			>
// 				{items.map(buildNavItem)}
// 			</MenuGroup>
// 		);
// 	}

// 	function buildNavItem (item: INavItem) {
// 		const { id, title, icon, isHidden, type, children = [] /*badge, */ } = item;
// 		if (isHidden) {
// 			return null;
// 		}

// 		if (type === NavItemTypes.Divider) {
// 			return (
// 				<MenuItem
// 					key={id}
// 					id={id}
// 					title={title}
// 				/>
// 			);
// 		}

// 		const hasChildren = children.length > 0;
// 		const tree = hasChildren
// 			? buildParentLevel(children)
// 			: null;

// 		return (
// 			<MenuItem
// 				key={id}
// 				id={id}
// 				isHeading={type === NavItemTypes.Group}
// 			>
// 				<MenuItemContainer item={item}>
// 					{ typeof icon === 'object' && (
// 						<MenuItemIcon
// 							icon={icon}
// 							title={title}
// 							size={20}
// 						/>
// 					)}
// 					<MenuItemTitle>{title}</MenuItemTitle>
// 				</MenuItemContainer>
// 				{ tree }
// 			</MenuItem>
// 		);
// 	}

// 	return (
// 		<MenuContainer>
// 			{ buildParentLevel(props.items, true) }
// 		</MenuContainer>
// 	);
// };
