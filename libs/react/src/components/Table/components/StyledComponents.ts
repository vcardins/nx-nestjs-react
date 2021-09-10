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

export const Table = styled.div`
	position: relative;
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
	flex: 1;
	flex-direction: column;
	font-size: 1em;
	height: 100%;

	${Table} {
		display: grid;
		grid-template-rows: repeat(${({ rows }) => rows}, min-content) max-content;
		grid-template-columns: ${({ colsWidths }) => colsWidths.map((col) => (col > 0 ? `${col}px ` : ' auto '))};
		flex: 1;
		z-index: 1;

		${({ theme, rowHeight }) => css`
			/* background: repeating-linear-gradient(${ theme.evenRowColor} 0 ${rowHeight}px, ${theme.oddRowColor} ${rowHeight}px ${rowHeight * 2}px); */
			[role='th'],
			[role='td'] {
				height: ${rowHeight}px;
				width: 100%;
			}
		`}

		[role='td'] {
			&[data-order="odd"] {
				background-color: ${theme.oddRowColor};
			}

			&[data-order="even"] {
				background-color: ${theme.evenRowColor};
			}
		}

		[role='th'] {
			position: sticky;
			top: 0;
			background-color: ${theme.white};
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

			&[data='sortable'] {
				cursor: pointer;
			}
			div {
				flex: 1;
				&:last-child {
					flex: 0 1 auto;
				}
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

			[role='td'] {
				&[data-fixed-left='true'],
				&[data-fixed-right='true'] {
					z-index: 1;
					position: sticky;
				}
			}

			[data-fixed-left='true'] {
				left: 0;
			}
			[data-fixed-right='true'] {
				right: 0;
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
	position: absolute;
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
