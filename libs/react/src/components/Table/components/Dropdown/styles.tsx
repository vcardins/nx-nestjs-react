import styled, { css } from 'styled-components';

import { IChevron, IDropdownContainer } from './types';

const buildArrow = ({ isBefore, color, position }: { isBefore: boolean, color: string, position: IDropdownContainer['position'] }) => {
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

export const LabelWrapper = styled.span`
	min-height: 1em;
	line-height: 1;
`;

export const DropdownListItem = styled.li<{ selected?: boolean; showCheckbox?: boolean }>`
	cursor: pointer;
	user-select: none;
	display: flex;
	align-items: center;
	white-space: nowrap;
	width: inherit;
	padding: 0.5em;

	&:hover {
		background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
	}

	input { margin-right: 0.5em; }

	${({ selected, showCheckbox }) => (selected && !showCheckbox) && css`
		${LabelWrapper} {
			text-decoration: underline;
		}
	`}
`;

export const DropdownListWrapper = styled.ul<{ columns?: number }>`
	list-style: none;
	width: 100%;
	overflow: auto;
	margin-right: 1em;
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`;

export const DropdownAnchor = styled.label`
	display: flex;
	align-items: center;
	width: 100%;
`;

export const DropdownTrigger = styled.a<IChevron>`
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

export const DropdownTitle = styled.div`
	padding: 0 0.25em 0.25em 0.25em;
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const DropdownFooter = styled.div`
	padding: 0.25em 0.25em 0 0.25em;
	border-top: 1px solid ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const DropdownContent = styled.div<{ hasFooter?: boolean; hasTitle?: boolean }>`
	overflow: auto;
	padding: 0 0.25em;
	margin-top: ${({ hasTitle }) => hasTitle && '0.5em'} ;
	margin-bottom: ${({ hasFooter }) => hasFooter && '0.5em'} ;
	max-height: 500px;
`;

export const DropdownContainer = styled.div<IDropdownContainer>`
	display: flex;
	flex-direction: column;
	position: absolute;
	overflow: hidden;
	z-index: 999;
	transition: all 0.3s;
	box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
	top: 20px;
	padding: 0.5em;
	${({ position }) => position}: -5px;
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lighterGrey };
	background-color: ${({ theme }) => theme.colors.primary.white };
	min-width: ${({ width = '150px' }) => width };
	${({ height }) => height && css`
		max-height: ${height};
	`};

	${({ active }) => !active
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

export const DropdownWrapper = styled.div`
	position: relative;
`;
