import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Icon } from '../../components/Icon';

interface IMenuGroupProps {
	isHeading?: boolean;
	collapsed?: boolean;
}

const baseMenuItemCss = css`
	display: flex;
	flex-direction: column;
`;

export const MenuItemIcon = styled(Icon)`
	order: -1;
`;


export const NavItemDivider = styled.span`
	${baseMenuItemCss}
	padding: 0.5em 0 0.5em 1em;
`;

export const NavItemLink = styled.a`
	font-size: 100%;
`;

export const NavItemGroup = styled.span.attrs({ 'data-menu-group': true })`
	> div { font-weight: bold; }
`;

export const NavItemRoute = styled(Link)`
	${baseMenuItemCss}
	${MenuItemIcon} {
		order: -1;
	}
`;

/*********  */

export const MenuGroup = styled.div<IMenuGroupProps>`
	overflow: hidden;
	width: 100%;
`;

export const SubMenuGroup = styled.div<IMenuGroupProps>`
	overflow: hidden;
	width: 100%;
`;

export const UL = styled.ul<{ isVisible: boolean }>`
	list-style: none;
	margin: 0;
	padding: 0;
	width: 100%;
	max-height: 0;
	overflow: hidden;
	max-height: 100vh;
	transition: all .35s;

	${({ isVisible }) => !isVisible && css`
		max-height: 0;
	`}
`;

export const LI = styled.li`
	overflow: hidden;
	transition: all .35s;
`;

export const Item = styled.div<{ dept: number }>`
	display: flex;
	padding: 0.5em 0.75em;
	padding-left: ${({ dept = 1 }) => `${ dept * 15 }px`};
	align-items: center;
`;

export const Label = styled.span`
	width: 100%;
	display: block;
	cursor: pointer;
`;

export const Arrow = styled.span<{ toggle: boolean }>`
	display: flex;
	height: 25px;
	width: 35px;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&::after {
		content: '';
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;

		border-top: 4px solid #fff;
		transform: ${({ toggle }) => (toggle ? 'rotate(180deg)' : 'rotate(0deg)')};
	}
`;
