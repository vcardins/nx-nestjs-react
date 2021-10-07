import styled, { css } from 'styled-components';

import { IPopoverTrigger, IPopoverContainer } from './types';

const buildArrow = ({ isBefore, color, position }: { isBefore: boolean, color: string, position: IPopoverContainer['position'] }) => {
	const { border, topLeft } = isBefore
		? { border: 6, topLeft: 4 }
		: { border: 5, topLeft: 5 };

	return css`
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		${position}: ${topLeft}px;
		top: -${border}px;
		border-left: ${border}px solid transparent;
		border-right: ${border}px solid transparent;
		border-bottom: ${border}px solid ${color};
	`;
};

export const PopoverTrigger = styled.a<IPopoverTrigger>`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	${({ hideChevron }) => !hideChevron && css`
		&::after {
			content: '▾';
			margin-left: 0.25em;
		}
	`}
`;

export const PopoverTriggerTitle = styled.span`
	margin-left: 0.5em;
`;

export const PopoverTitle = styled.div`
	padding: 0 0.25em 0.5em 0.25em;
	font-weight: 700;
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const PopoverFooter = styled.div`
	padding: 0.25em 0.25em 0 0.25em;
	border-top: 1px solid ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const PopoverContent = styled.div<{ hasFooter?: boolean; hasTitle?: boolean }>`
	overflow: auto;
	margin-top: ${({ hasTitle }) => hasTitle && css`0.5em`} ;
	margin-bottom: ${({ hasFooter }) => hasFooter && css`0.5em`} ;
	max-height: 500px;
`;

export const PopoverContainer = styled.div<IPopoverContainer>`
	display: flex;
	flex-direction: column;
	position: absolute;
	overflow: hidden;
	z-index: 999;
	transition: opacity 0.5s;
	box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
	top: 20px;
	padding: 1em;
	${({ position }) => position}: -5px;
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lighterGrey };
	background-color: ${({ theme }) => theme.colors.primary.white };
	min-width: ${({ width = '150px' }) => width };
	${({ height }) => height && css`
		max-height: ${height};
	`};

	${({ isOpen }) => !isOpen
		? css`
			height: 0;
			opacity: 0;
			visibility: hidden;
			transform: translateY(-10px);
		`
		: css`
			visibility: visible;
			opacity: 1;
			transform: translateY(0);
		`
}

	&::before {
		${({ theme, position }) => buildArrow({ isBefore: true, position, color: theme.colors.tertiary.lighterGrey })};
	}

	&::after {
		${({ theme, position }) => buildArrow({ isBefore: false, position, color: theme.colors.primary.white })};
	}
`;

export const PopoverWrapper = styled.div`
	position: relative;
`;
