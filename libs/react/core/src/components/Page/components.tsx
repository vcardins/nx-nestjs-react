import React from 'react';
import styled from 'styled-components';
import { Icon } from '../../components/Icon';

export const PageWrapper = styled.div`
	display: grid;
	grid-template: 'pageHeader' 'pageBody';
	grid-template-columns: 100%;
	grid-template-rows: ${({ theme }) => theme.sizes.header.height } 1fr;
	height: 100%;
`;

export const PageHeader = styled.div`
	grid-area: pageHeader;
	display: flex;
	align-items: center;
	padding: 0 ${({ theme }) => theme.spacing.large };
	background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const PageTitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 300px;
`;

export const PageIcon = ({ icon }: { icon?: string }) => {
	if (!icon) {
		return null;
	}

	return (
		<PageWrapper>
			<Icon name={icon}/>
		</PageWrapper>
	);
};

export const PageTitle = styled.div`
	font-size: 24px;
`;

export const PageSubTitle = styled.div`
	font-size: 12px;
`;

export const PageActionsWrapper = styled.div`
	display: flex;
	margin-left: auto;
`;

export const PageBody = styled.div<{ padded: boolean }>`
	grid-area: pageBody;
	${({ padded = false }) => padded && 'padding: 1em 2em'};
	overflow: auto;
`;

// export const PageNav = styled.div`
// 	flex: 1 1 auto;
// 	overflow-y: auto;
// 	overflow-x: hidden;
// `;

// export const PageActionItem = styled.span`
// 	flex: 1;
// 	cursor: pointer;
// 	padding: 5px 0;
// 	text-align: center;
// 	font-size: 16px;
// 	color: ${({ theme }) => theme.colors.secondary.lightBlue };

// 	&:hover {
// 		color: ${({ theme }) => theme.colors.primary.white };
// 	}
// `;

// export const PageFooter = styled.footer`
// 	background-color: ${({ theme }) => theme.colors.primary.blue };
// 	display: flex;
// 	height: 2.5em;
// 	align-items: center;
// 	color: ${({ theme }) => theme.colors.primary.white };
// `;

// export const PageWrapper = styled.nav<{ collapsed? : boolean }>`
// 	display: flex;
// 	flex-direction: column;
// 	order: -1;
// 	width: ${sidebarWidthExpanded};
// 	transition: width 0.5s ease;
// 	box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.15);
// 	background: ${({ theme }) => theme.colors.primary.blue };
// 	color: ${({ theme }) => theme.colors.primary.white };
// 	${({ collapsed }) => collapsed && css`
// 		width: ${sidebarWidthCollapsed};

// 		${PageHeader} {
// 			display: flex;
// 		}

// 		${PageFooter} {
// 			${PageActionItem}:not([data-action="toggle-collapse"]) {
// 				display: none;
// 			}
// 		}
// 	`};
// `;
