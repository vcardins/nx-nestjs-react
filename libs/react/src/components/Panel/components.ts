import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

export const PanelHeader = styled.div`
	grid-area: header;
	max-height: 60px;
	display: flex;
	align-items: center;
	padding: ${({ theme }) => theme.spacing.normal };
	background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const PanelTitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const PanelTitle = styled.div`
	font-size: 18px;
`;

export const PanelSubTitle = styled.div`
	font-size: 12px;
`;

export const PanelActionsWrapper = styled.div`
	display: flex;
	margin-left: auto;
`;

export const PanelBody = styled.main<{ padded: boolean; overflow?: CSSProperties['overflow']; }>`
	grid-area: body;
	${({ padded = false }) => padded && css`padding: 1em`};
	overflow: ${({ overflow = 'auto' } ) => overflow};
`;

export const PanelFooter = styled.div<{ padded: boolean }>`
	grid-area: footer;
	max-height: 60px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${({ padded = false }) => padded && css`padding: 1em`};
	background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
`;

export const PanelWrapper = styled.div<{ hasHeader: boolean; hasFooter: boolean }>`
	height: 100%;
	display: grid;
	grid-template: ${({ hasHeader, hasFooter }) =>
		`${hasHeader ? '\'header\'' : ''} 'body' ${hasFooter ? '\'footer\'' : ''}`
	};
	grid-template-columns: 1fr;
	grid-template-rows: ${({ hasHeader, hasFooter }) =>
		`${hasHeader ? 'auto' : ''} 1fr ${hasFooter ? 'auto' : ''}`
	};
`;

