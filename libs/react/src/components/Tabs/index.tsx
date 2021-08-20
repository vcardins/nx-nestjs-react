import React, { useMemo } from 'react';
import styled from 'styled-components';

import { TabLink, ITabLinkProps } from './TabLink';
import { TabContent } from './TabContent';

type ITabProps = Pick<ITabLinkProps, 'label' | 'disabled' | 'selected'>  & { children: React.ReactElement }

interface ITabsProps {
	children: React.ReactElement | React.ReactElement[];
	onAfterChange?: (tab: ITabProps, index: number) => void;
}

const TabsStyled = styled.div`
	display: flex;
	flex-direction: column;
`;

const TabsLinksContainer = styled.ul`
	list-style: none;
	display: inline-flex;
`;

const TabsContentsContainer = styled.div`
	flex: 1;
`;

export const Tab = (props: ITabProps) => <div {...props} />;

export const Tabs = (props: ITabsProps) => {
	const children = props.children as React.ReactElement[];
	const selectedTabIndex = children.findIndex((tab) => (tab.props as ITabProps).selected);
	const [selectedTab, setSelectedTab] = React.useState(selectedTabIndex !== -1 ? selectedTabIndex : 0);

	const { links, content } = useMemo(() =>
		(React.Children.toArray(children) as React.ReactElement[])
			.reduce((result, tab, index) => {
				const { label, disabled, children } = (tab.props as ITabProps);
				const isSelected = index === selectedTab;

				result.links.push(
					<TabLink
						key={label}
						label={label}
						disabled={disabled}
						selected={isSelected}
						onChange={() => {
							setSelectedTab(index);
							props.onAfterChange?.(tab.props as ITabProps, index);
						}}
					/>,
				);

				if (isSelected) {
					result.content = (
						<TabContent>
							{children}
						</TabContent>
					);
				}

				return result;
			}, { links: [], content: null } as { links: React.ReactElement[]; content: React.ReactElement | null; })
	, [selectedTab, children]);

	return (
		<TabsStyled>
			<TabsLinksContainer>
				{ links }
			</TabsLinksContainer>
			<TabsContentsContainer>
				{ content }
			</TabsContentsContainer>
		</TabsStyled>
	);
};
