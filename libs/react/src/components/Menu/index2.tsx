import { INavItem, NavItemTypes } from '@xapp/shared/types';
import React from 'react';

import {
	MenuContainer,
	MenuGroup,
	MenuItem,
	MenuItemContainer,
	MenuItemTitle,
	MenuItemIcon,
	// MenuItemBadge,
} from './styles';

interface IMenuProps {
	collapsed?: boolean;
	items: INavItem[];
	position?: string;
	activeItem?: string;
	trigger?: string;
}

export const Menu = (props: IMenuProps) => {
	const { position = 'vertical', collapsed/*trigger = 'click', activeItem */ } = props;

	// function triggerMenu ({ target }: React.MouseEvent<HTMLElement>, href: Function): void {
	// 	event.stopPropagation();
	// 	const el = target.closest('.menu-item');
	// 	const elParent = el.closest('.menu-parent');
	// 	const elParentId = elParent ? elParent.getAttribute('id') : undefined;

	// 	if (pinedItems.length) {
	// 		pinedItems.forEach(({id, el}) => elParentId ? id !== elParentId : true && el.classList.remove('expanded'));
	// 	}

	// 	if (elParent === el) {
	// 		elParent.classList.toggle('expanded');
	// 		pinedItems.push({ id: elParentId, el: elParent });
	// 	} else {
	// 		if (typeof href === 'function') {
	// 			href();
	// 		} else {
	// 			onRouteChange(href);
	// 		}
	// 	}
	// }
	function buildParentLevel(items: INavItem[], isHeading = false) {
		const rootProps = isHeading && { className: `nav-main nav-main--${position} nav-main--${collapsed ? 'collapsed' : 'expanded'}` };

		return (
			<MenuGroup
				{...rootProps}
				collapsed={collapsed}
				isHeading={isHeading}
			>
				{items.map(buildNavItem)}
			</MenuGroup>
		);
	}

	function buildNavItem (item: INavItem) {
		const { id, label: title, icon, isHidden, type, children = [] /*badge, */ } = item;
		if (isHidden) {
			return null;
		}

		if (type === NavItemTypes.Divider) {
			return (
				<MenuItem
					key={id}
					id={id}
					title={title}
				/>
			);
		}

		const hasChildren = children.length > 0;
		const tree = hasChildren
			? buildParentLevel(children)
			: null;

		return (
			<MenuItem
				key={id}
				id={id}
				isHeading={type === NavItemTypes.Group}
			>
				<MenuItemContainer item={item}>
					{ typeof icon === 'object' && (
						<MenuItemIcon
							icon={icon}
							title={title}
							size={20}
						/>
					)}
					<MenuItemTitle>{title}</MenuItemTitle>
				</MenuItemContainer>
				{ tree }
			</MenuItem>
		);
	}

	return (
		<MenuContainer>
			{ buildParentLevel(props.items, true) }
		</MenuContainer>
	);
};
