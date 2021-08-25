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
			<Icon icon={icon}/>
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
