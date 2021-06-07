import styled, { css } from 'styled-components';
import { Icon } from '@xapp/react/core';

export const HouseholdItem = styled.li`
	display: grid;
	grid-template-columns: auto 130px 20px 20px;
	width: inherit;
	padding: 0.5em 1em;
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey};
`;

export const HouseholdIcon = styled(Icon)`
	text-align: center;
	color: ${({ theme }) => theme.colors.tertiary.lightGrey};
	:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.secondary.blue};
	}
`;

export const HouseholdList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;

	${HouseholdItem} {
		:hover {
			background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
		}
	}
`;
