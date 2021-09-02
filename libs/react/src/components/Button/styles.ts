import styled from 'styled-components';
import { ITheme } from '@xapp/shared/types';

import { IButtonProps } from './IButtonProps';

export const StyledButton = styled.button<IButtonProps>`
	overflow: hidden;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	min-width: fit-content;
	min-height: fit-content;
	color: ${({ theme }) => (theme as ITheme).colors.primary.white };
	cursor: pointer;
	padding: 4px 16px;
	border: none;
	border-radius: 3px;
	background: ${({ theme, bgColor }) => bgColor || (theme as ITheme).colors.primary.blue };
	transition: 0.1s ease 0s;
	user-select: none;
	outline: none;

	&:hover {
		background: ${({ theme, hoverBgColor }) => hoverBgColor || (theme as ITheme).colors.secondary.blue };
	}

	.circle {
		position: absolute;
		background: white;
		border-radius: 50%;
		animation: clickEffect 0.4s ease-out;
		z-index: 99999;
	}

	@keyframes clickEffect{
		0% {
			opacity: 1;
			width: 0.5em;
			height: 0.5em;
			margin: -0.25em;
			border-width: 0.5em;
		}
		100% {
			opacity: 0;
			width: 15em;
			height: 15em;
			margin: -7.5em;
			border-width: 0.03em;
		}
	}
`;
