import React, { CSSProperties } from 'react';
import { Icon } from '../../components/Icon';

import {
	PanelWrapper,
	PanelHeader,
	PanelTitle,
	PanelSubTitle,
	PanelTitleWrapper,
	PanelActionsWrapper,
	PanelBody,
	PanelFooter,
} from './components';

interface IPanelProps {
	id?: string;
	tag?: string;
	title?: string | React.ReactElement;
	subTitle?: string | React.ReactElement;
	icon?: string;
	compact?: boolean;
	columns?: number;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	actions?: string | React.ReactNode;
	overflow?: CSSProperties['overflow'];
	maxHeight?: CSSProperties['height'];
	padded?: boolean;
}

export const Panel = ({ id, tag, compact, title, maxHeight, columns, subTitle, icon, children, actions, padded, overflow, footer }: IPanelProps) => (
	<PanelWrapper
		id={id || `${tag}-container`}
		compact={compact}
		maxHeight={maxHeight}
		hasHeader={!!title}
		hasFooter={!!footer}
	>
		{(title || actions) && (
			<PanelHeader id={`${tag}-header`}>
				<PanelTitleWrapper>
					<PanelTitle id={`${tag}-title`}>
						{ icon && <Icon icon={icon}/> }
						{ title }
					</PanelTitle>
					<PanelSubTitle id={`${tag}-sub-title`}>
						{ subTitle }
					</PanelSubTitle>
				</PanelTitleWrapper>
				<PanelActionsWrapper id={`${tag}-actions`}>
					{ actions }
				</PanelActionsWrapper>
			</PanelHeader>
		)}
		<PanelBody id={`${tag}-body`} padded={padded} overflow={overflow} columns={columns}>
			{ children }
		</PanelBody>
		{footer && (
			<PanelFooter id={`${tag}-footer`} padded={padded} >
				{ footer }
			</PanelFooter>
		)}
	</PanelWrapper>
);
