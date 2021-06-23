import styled from 'styled-components';
import { Icon } from '@xapp/react';

export const TaskTemplateItem = styled.li`
	width: inherit;
	padding: 0.5em 1em;
	border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey};
`;

export const TaskTemplateItemInfo = styled.div`
	width: inherit;
	display: grid;
	grid-template-columns: auto 20px;
`;

export const TaskTemplateItemInvite = styled.div`
	width: inherit;
	display: grid;
	grid-template-columns: 100px auto 20px;
`;

export const TaskTemplateIcon = styled(Icon)`
	text-align: center;
	color: ${({ theme }) => theme.colors.tertiary.lightGrey};
	:hover {
		cursor: pointer;
		color: ${({ theme }) => theme.colors.secondary.blue};
	}
`;

export const TaskTemplateList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;

	${TaskTemplateItem} {
		:hover {
			background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
		}
	}
`;
