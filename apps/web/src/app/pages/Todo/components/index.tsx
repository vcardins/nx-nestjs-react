import styled, { css } from 'styled-components';
import { Icon } from '@xapp/react';

export const TodoItem = styled.li<{ isCompleted: boolean }>`
	display: grid;
	grid-template-columns: auto 130px 20px 20px;
	width: inherit;
	padding: 0.5em 1em;
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey};
	${({ isCompleted }) =>
		isCompleted &&
		css`
			text-decoration: line-through;
			text-decoration-style: dashed;
			color: ${({ theme }) => theme.colors.tertiary.grey};
		`};
	[data-completed='true'] {
		color: ${({ theme }) => theme.colors.primary.green};
	}
`;

export const TodoIcon = styled(Icon)`
	text-align: center;
	color: ${({ theme }) => theme.colors.tertiary.lightGrey};
	:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.secondary.blue};
	}
`;

export const TodoList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;

	${TodoItem} {
		:hover {
			background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
		}
	}
`;
