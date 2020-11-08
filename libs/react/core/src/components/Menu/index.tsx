import React from 'react';

import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { DropdownItemTypes } from '../../enums/DropdownItemTypes';

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
	items: IDropdownItem[];
	position?: string;
	activeItem?: string;
	trigger?: string;
	onBuildId: (key: string) => string;
}

export const Menu = (props: IMenuProps) => {
	const { position = 'vertical', collapsed, onBuildId/*trigger = 'click', activeItem */ } = props;

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

	function buildParentLevel(items: IDropdownItem[], isHeading = false) {
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

	function buildNavItem (item: IDropdownItem) {
		if (item.hide) {
			return null;
		}

		if (item.type === DropdownItemTypes.Divider) {
			return (
				<MenuItem key={item.id} id={onBuildId(item.id)} title={item.title} />
			);
		}

		const { id, title, icon, type, children = [] /*badge, */} = item;
		const hasChildren = children.length > 0;
		const tree = hasChildren
			? buildParentLevel(children)
			: null;
		const key = onBuildId(id);

		return (
			<MenuItem
				key={key}
				id={key}
				isHeading={type === DropdownItemTypes.Group}
			>
				<MenuItemContainer item={item}>
					<MenuItemIcon
						icon={icon}
						title={title}
						size={20}
					/>
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
