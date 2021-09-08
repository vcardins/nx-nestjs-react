import styled, { css } from 'styled-components';


const tableHeaderStyle = css`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.colors.primary.white};
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey};
	font-weight: 700;
	z-index: 2;
	width: 100%;

	svg {
		color: ${({ theme }) => theme.colors.tertiary.lightGrey};
	}
`;

const shadowStyle = css`
	position: absolute;
	z-index: 3;
	height: 4px;
	left: 0;
	right: 0;
`;

const cellStyle = css`
	padding: 0.25em 0.5em;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: inherit;
	height: inherit;
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

export const TableContent = styled.div`
	position: relative;
`;

export const TableCellContent = styled.span`
	${cellStyle};
`;

export const TableWrapper = styled.div<{ colsWidths: (number | 'auto')[]; rows: number; rowHeight: number }>`
	flex: 1;
	flex-direction: column;
	font-size: 1em;
	height: 100%;

	${TableContent} {
		display: grid;
		grid-template-rows: repeat(${({ rows }) => rows}, min-content) max-content;
		grid-template-columns: ${({ colsWidths }) => colsWidths.map((col) => (col > 0 ? `${col}px ` : ' auto '))};
		flex: 1;
		z-index: 1;

		${({ theme, rowHeight }) => css`
			background: repeating-linear-gradient(${theme.colors.secondary.lightestBlue} 0 ${rowHeight}px, transparent ${rowHeight}px ${rowHeight * 2}px);
			[role='column-header'],
			[role='tablecell'] {
				height: ${rowHeight}px;
				width: 100%;
			}
		`}

		[role='column-header'] {
			${tableHeaderStyle};

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

		[role='column-label'] {
			${cellStyle};
		}
	}

	@media (min-width: 769px) {
		overflow-y: auto;

		& + [role='table'] {
			margin-left: 1rem;
		}

		${TableContent} {
			[role='column-header'],
			[role='tablecell'] {
				display: flex;
				align-items: center;
				border-right: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey};
			}

			[role='tablecell'] {
				[data-fixed-left='true'],
				[data-fixed-right='true'] {
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

		& + [role='table'] {
			margin-top: 2rem;
		}

		${TableContent} {
			grid-template-columns: 1;

			> [role='column-header'] {
				display: none;
			}

			> [role='tablecell'] {
				padding: 0.25rem;
			}

			.label {
				display: block;
				font-weight: 700;
			}
		}
	}
`;
