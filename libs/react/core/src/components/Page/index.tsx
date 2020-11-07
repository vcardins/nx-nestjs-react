import React from 'react';

import {
	PageWrapper,
	PageHeader,
	PageTitle,
	PageSubTitle,
	PageIcon,
	PageTitleWrapper,
	PageActionsWrapper,
	PageBody,
} from './components';

interface Props {
	id?: string;
	title?: string;
	subTitle?: string | React.ReactNode;
	icon?: string;
	children?: React.ReactNode;
	actions?: string | React.ReactNode;
	padded?: boolean;
}

export const Page = ({
	id,
	title,
	subTitle,
	icon,
	children,
	actions,
	padded,
}: Props) => {
	return (
		<PageWrapper id={id}>
			{title && (
				<PageHeader id="page-header">
					<PageTitleWrapper>
						<PageTitle id="page-title">
							<PageIcon icon={icon}/>
							{ title }
						</PageTitle>
						<PageSubTitle id="page-sub-title">
							{ subTitle }
						</PageSubTitle>
					</PageTitleWrapper>
					<PageActionsWrapper id="page-actions">
						{ actions }
					</PageActionsWrapper>
				</PageHeader>
			)}
			<PageBody
				id="page-body"
				padded={padded}
			>
				{ children }
			</PageBody>
		</PageWrapper>
	);
};
