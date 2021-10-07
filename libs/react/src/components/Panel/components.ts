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

export const PanelBody = styled.main<{ padded: boolean; columns?: number; overflow?: CSSProperties['overflow']; }>`
	grid-area: body;
	display: grid;
	grid-template-columns: ${({ columns = 1 }) => `repeat(${columns}, 1fr)`};
	${({ columns }) => columns && css`gap: 0.5em 1em;`};
	padding: ${({ padded = false }) => padded ? '1em' : '0'};
	overflow: ${({ overflow = 'auto' }) => overflow};
`;
export const PanelFooter = styled.div<{ padded: boolean }>`
	grid-area: footer;
	max-height: 60px;
	display: flex;
	align-items: center;
	padding: 0.75em;
	margin-top: 0.5em;
	background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey};
	> * {
		justify-content: flex-end;
	}
`;

export const PanelWrapper = styled.div<{ hasHeader: boolean; hasFooter: boolean; compact: boolean; maxHeight?: CSSProperties['height'] }>`
	height: ${({ maxHeight = '100%' }) => maxHeight};
	display: grid;
	grid-template: ${({ hasHeader, hasFooter }) => `${hasHeader ? '\'header\'' : ''} 'body' ${hasFooter ? '\'footer\'' : ''}`};
	grid-template-columns: 1fr;
	grid-template-rows: ${({ hasHeader, hasFooter }) => `${hasHeader ? 'auto' : ''} 1fr ${hasFooter ? 'auto' : ''}`};

	${({ compact }) => compact && css`
		width: max-content;
		${PanelHeader} {
			padding: ${({ theme }) => theme.spacing.mini };
		}
		${PanelTitle} {
			font-size: 12px;
		}
		${PanelSubTitle} {
			font-size: 10px;
		}
		${PanelFooter} {
			border-top: 1px solid ${({ theme }) => theme.colors.tertiary.lightestGrey};
			background-color: transparent;
		}
	`}
`;

