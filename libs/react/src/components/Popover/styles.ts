import styled, { css } from 'styled-components';
import { IDropdownWrapper } from './types';

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

export const PopoverWrapper = styled.div<IDropdownWrapper>`
	position: relative;
	${({ position }) => position}: 0;
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lighterGrey };
	z-index: 999;
	padding: 2px;
	background-color: ${({ theme }) => theme.colors.primary.white };
	transform: translateY(-10px);
	transition: all 0.3s;

	&::before {
		${({ theme, arrowPosition = 85, position }) => buildArrow(6, theme.colors.tertiary.lighterGrey, position === 'right' ? arrowPosition : 5)};
	}

	&::after {
		${({ theme, arrowPosition = 85, position }) => buildArrow(5, theme.colors.primary.white, position === 'right' ? arrowPosition : 5)};
	}
`;

export const PopoverContainer = styled.div`
	position: absolute;
	background: #fff;
	border-radius: 4px;
	width: max-content;
	top: 100%;
	left: -50px;
	margin: 20px auto;
	padding: 15px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
