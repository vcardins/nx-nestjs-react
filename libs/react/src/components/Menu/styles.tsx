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
	${({ isHeading }) =>
		isHeading &&
		css`
			:last-child {
				align-content: flex-end;
			}
		`}
	${({ isHeading }) =>
		!isHeading &&
		css`
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

export const NavItemDivider = styled.span`
	${baseMenuItemCss}
	padding: 0.5em 0 0.5em 1em;
`;

export const NavItemLink = styled.a`
	font-size: 100%;
`;

export const NavItemGroup = styled.span.attrs({ 'data-menu-group': true })`
	> div { font-weight: bold; }
	/* position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 16px 10px;
	color: rgba(255, 255, 255, 0.5);
	text-transform: uppercase;
	font-size: 14px; */
`;

export const NavItemRoute = styled(Link)`
	${baseMenuItemCss}
	${MenuItemIcon} {
		order: -1;
	}
`;


/*********  */
export const UL = styled.ul<{ isVisible: boolean }>`
	list-style: none;
	margin: 0;
	padding: 0;
	width: 100%;
	transition: height visibility 0.6s ease-in-out;

	${({ isVisible }) => !isVisible && css`
		visibility: hidden;
		height: 0;
	`}
`;
export const LI = styled.li``;
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
