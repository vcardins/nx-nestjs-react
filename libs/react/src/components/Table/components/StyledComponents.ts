import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

import { TextAlignment } from '@xapp/shared/types';
import { theme } from '../theme';
import { ITableTheme } from '../types';

const shadowStyle = css`
	position: absolute;
	z-index: 3;
	height: 4px;
	left: 0;
	right: 0;
`;

const cellStyle = css`
	padding: ${theme.cellPadding};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: inherit;
`;

export const BottomShadow = styled.div`
	${shadowStyle};
	bottom: 0;
	background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
`;

export const TopShadow = styled.div<{ top: number }>`
	${shadowStyle};
	margin-top: ${({ top }) => top}px;
	display: none;
	background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
`;


export const TR = styled.div<{ bg?: CSSProperties['color'] }>`
	> div {
		background-color: ${({ bg }) => bg};
	}
`;

export const THead = styled.div`
	display: grid;
`;

export const TBody = styled.div``;

export const Table = styled.div`
	display: grid;
`;

export const TableCellContent = styled.span<{ align?: TextAlignment; bg?: CSSProperties['color'] }>`
	${cellStyle};
	${({ align }) => align && css`
		text-align: ${align};
	`};
	${({ bg = 'transparent' }) => css`
		background-color: ${bg};
	`};
`;

export const ExpandedTableCell = styled.div<{ align?: TextAlignment; bg: CSSProperties['color']; borderColor: CSSProperties['borderColor'] }>`
	display: grid;
	grid-column: 1/-1;
	align-items: center;
	${({ borderColor }) => borderColor && css`
		padding: 0.5em;
		border: 1px solid ${borderColor};
	`};

	${({ align }) => align === TextAlignment.Center && css`
		justify-content: ${align};
	`};

	${({ bg }) => bg && css`
		background-color: ${bg};
	`};
`;

export const TableContainer = styled.div<{ colsWidths: (number | 'auto')[]; rows: number; theme: ITableTheme; rowHeight: ITableTheme['rowHeight'] }>`
	height: 100%;

	${Table} {
		z-index: 1;

		${TR},
		${THead} {
			display: grid;
			grid-template-rows: repeat(${({ rows }) => rows}, min-content) max-content;
		}

		${({ rowHeight }) => css`
			[role='th'],
			[role='td'] {
				height: ${rowHeight}px;
				width: 100%;
			}
		`}

		${THead} {
			> div {
				background-color: ${theme.white};
			}
			position: sticky;
			top: 0;
			border-bottom: 1px solid ${theme.borderColor};
			font-weight: 700;
			z-index: 2;
			width: 100%;

			a {
				width: 100%;
				> * {
					width: auto;
				}
			}

			svg {
				opacity: 0.5
			}
		}
	}

	@media (min-width: 769px) {
		overflow-y: auto;

		& + [role='table-container'] {
			margin-left: 1rem;
		}

		${Table} {
			[role='th'],
			[role='td'] {
				display: flex;
				align-items: center;
				border-right: 1px solid ${({ theme }) => theme.borderColor};
			}

			[data-fixed]{
				z-index: 1;
				position: sticky;
			}

			[data-align='left'] {
				justify-content: flex-start;
			}
			[data-align='center'] {
				justify-content: center;
			}
			[data-align='right'] {
				justify-content: flex-end;
			}
		}
	}

	@media (max-width: 768px) {
		overflow-y: auto;

		& + [role='table-container'] {
			margin-top: 2rem;
		}

		${Table} {
			grid-template-columns: 1;

			> [role='th'] {
				display: none;
			}

			> [role='td'] {
				padding: 0.25rem;
			}
		}
	}
`;

export const Sorter = styled.span`
	display: flex;
	align-items: center;
	padding: 0.25em 2px;
`;

export const Resizer = styled.div<{ active?: boolean; height: number | 'auto' }>`
	display: block;
	/* position: absolute; */
	cursor: col-resize;
	width: 5px;
	right: 0;
	top: 0;
	z-index: 2;
	border-right: 2px solid transparent;
	height: ${({ height }) => height}px;

	&:hover {
		border-color: #ccc;
	}

	${({ active }) => active && css`border-color: #517ea5;`};
`;
