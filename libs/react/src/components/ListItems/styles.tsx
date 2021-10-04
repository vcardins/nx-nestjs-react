import styled, { css } from 'styled-components';

export const ListItemsWrapper = styled.ul<{ columns?: number }>`
	list-style: none;
	width: 100%;
	overflow: auto;
	margin-right: 1em;
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`;

export const ListItemLabelWrapper = styled.span`
	min-height: 1em;
	line-height: 1;
`;

export const ListItem = styled.li<{ selected?: boolean; showCheckbox?: boolean }>`
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
		${ListItemLabelWrapper} {
			text-decoration: underline;
		}
	`}
`;

export const ListItemLabel = styled.label`
	display: flex;
	align-items: center;
	width: 100%;
`;
