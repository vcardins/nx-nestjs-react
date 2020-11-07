import styled, { css } from 'styled-components';
import { DropdownSizeStyle } from './DropdownSizeStyle';

const buildArrow = (border: number, color: string, arrowPosition: number) => css`
	content: '';
	width: 0;
	height: 0;
	position: absolute;
	left: ${arrowPosition}%;
	top: -${border}px;
	margin-left: -${border}px;
	border-left: ${border}px solid transparent;
	border-right: ${border}px solid transparent;
	border-bottom: ${border}px solid ${color};
`;

interface IDropdownWrapper {
	arrowPosition?: number;
	children: any;
	position?: string;
}

export const DropdownWrapper = styled.div<IDropdownWrapper>`
	position: absolute;
	${({position}) => position}: 0;
	top: 20px;
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lighterGrey };
	z-index: 999;
	padding: 2px;
	background-color: ${({ theme }) => theme.colors.primary.white };
	opacity: 0;
	transform: translateY(-10px);
	transition: all 0.3s;
	box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);

	&[data-active="false"] {
		max-height: 0;
		visibility: hidden;
	}

	&[data-active="true"] {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
		margin-top: 5px;
	}

	&::before {
		${({ theme, arrowPosition = 85, position }) => buildArrow(6, theme.colors.tertiary.lighterGrey, position === 'right' ? arrowPosition : 5)};
	}

	&::after {
		${({ theme, arrowPosition = 85, position }) => buildArrow(5, theme.colors.primary.white, position === 'right' ? arrowPosition : 5)};
	}
`;

export const IconWrapper = styled.span`
	margin-right: ${({ theme }) => theme.spacing.normal};
	line-height: 0;
`;

export const LabelWrapper = styled.span`
	min-height: 1em;
	line-height: 1;
`;

export const DropdownLabel = styled.div`
	margin-right: ${({ theme }) => theme.spacing.mini};
	color: ${({ theme }) => theme.colors.tertiary.grey};
	border-bottom: 1px dotted transparent;
`;

export const DropdownListItem = styled.li<{ show?: boolean }>`
	padding: 0.4em;
	display: flex;
	align-items: center;
	cursor: pointer;
	white-space: nowrap;

	&:hover {
		background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
	}

	&[data-selected='true'] {
		font-weight: bold;
		background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
	}
`;

export const DropdownListWrapper = styled.ul<{ addSpacing?: boolean }>`
	list-style: none;
	max-height: 175px;
	width: 100%;
	overflow: auto;
	${({addSpacing}) => addSpacing && css`
		margin-right: 1em;
	`}
`;
interface IDropdownContainer {
	highlightOnHover?: boolean;
	hideChevron: boolean;
	size: DropdownSizeStyle;
}

export const DropdownAnchor = styled.a`
	display: flex;
	align-items: center;
`;

export const DropdownContainer = styled.div<IDropdownContainer>`
	position: relative;
	line-height: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	button {
		cursor: pointer;
		outline: none;
		border: none;
		background-color: transparent;
		border-bottom: 1px dotted transparent;
		${({highlightOnHover}) => highlightOnHover && css`
			color: ${({ theme }) => theme.colors.primary.blue};
		`};
		${({hideChevron}) => !hideChevron && css`
			&::after {
				content: '▾';
				margin-left: 0.75em;
			}
		`}
		${({highlightOnHover}) => !highlightOnHover && css`
			:hover {
				border-bottom: 1px dotted ${({ theme }) => theme.colors.tertiary.grey};
			}
		`};
	}

	${DropdownListWrapper} {
		${({size, theme}) => css`
			font-size: ${theme.fontSizes[size === DropdownSizeStyle.Default ? 1 : 0]};
		`};
	}
`;
