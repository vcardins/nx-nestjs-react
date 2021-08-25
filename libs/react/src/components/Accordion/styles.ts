import styled from 'styled-components';

import { IWrapperProps } from './types';

export const Wrapper = styled.div<IWrapperProps>`
	width: ${({ width, unit }) => `${width}${typeof width === 'string' ? '' : unit}`};
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
`;

export const AccordionLabel = styled.label`
	display: flex;
	justify-content: space-between;
	padding: 1em;
	background: ${({ theme }) => theme.colors.primary.blue };
	color: ${({ theme }) => theme.colors.primary.white };
	font-weight: bold;
	cursor: pointer;

	&:hover {
		background: ${({ theme }) => theme.colors.secondary.blue };
	}

	&:after {
		content: '❯';
		width: 1em;
		height: 1em;
		text-align: center;
		transition: all .35s;
	}
`;

export const AccordionContent = styled.div`
	max-height: 0;
	padding: 0 1em;
	background: white;
	transition: all .35s;
`;

export const AccordionItem = styled.div`
	width: 100%;
	overflow: hidden;

	input {
		position: absolute;
		opacity: 0;
		z-index: -1;

		// :checked
		&:checked {
			+ ${AccordionLabel} {
				background: ${({ theme }) => theme.colors.secondary.blue };
				&::after {
					transform: rotate(90deg);
				}
			}
			~ ${AccordionContent} {
				max-height: 100vh;
				padding: 1em;
			}
		}
	}
`;
