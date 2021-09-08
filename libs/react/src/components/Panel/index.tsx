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

interface IPageProps {
	id?: string;
	tag?: string;
	title?: string | React.ReactElement;
	subTitle?: string | React.ReactElement;
	icon?: string;
	children?: React.ReactNode;
	footer?: React.ReactNode;
	actions?: string | React.ReactNode;
	overflow?: CSSProperties['overflow'];
	padded?: boolean;
}

export const Panel = ({ id, tag, title, subTitle, icon, children, actions, padded, overflow, footer }: IPageProps) => (
	<PanelWrapper
		id={id || `${tag}-container`}
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
		<PanelBody id={`${tag}-body`} padded={padded} overflow={overflow}>
			{ children }
		</PanelBody>
		{footer && (
			<PanelFooter id={`${tag}-footer`} padded={padded} >
				{ footer }
			</PanelFooter>
		)}
	</PanelWrapper>
);
