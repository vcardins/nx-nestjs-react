import React, { useMemo, useRef, useEffect, useCallback } from 'react';

import { TabsStyled, TabItemStyled, TabsLinksContainer, TabsContentsContainer, TabSlider } from './styles';
import { ITabProps, ITabsProps, ITabLinkProps } from './types';

export const TabLink = ({ selected, disabled, label, tabRef, onChange }: ITabLinkProps) => (
	<TabItemStyled
		ref={tabRef}
		selected={selected}
		disabled={disabled}
		title={label}
		onClick={() => !disabled ? onChange() : undefined}
	>
		{ label }
	</TabItemStyled>
);

export const Tab = (props: ITabProps) => <div {...props} />;

export const Tabs = (props: ITabsProps) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const children = props.children as React.ReactElement[];
	const selectedTabIndex = children.findIndex((tab) => (tab.props as ITabProps).selected);
	const tabsRefs = useMemo(() => children.map(() => React.createRef<HTMLLIElement>()), [children]);
	const [selectedTab, setSelectedTab] = React.useState(selectedTabIndex !== -1 ? selectedTabIndex : 0);

	const updateBorder = useCallback((offsetLeft: number, offsetWidth: number) => {
		if (sliderRef.current) {
			sliderRef.current.style.left = `${offsetLeft}px`;
			sliderRef.current.style.width = `${offsetWidth}px`;
		}
	}, [sliderRef.current]);

	const handleTabChange = (index: number, tab: ITabProps) => {
		setSelectedTab(index);
		props.onAfterChange?.(tab, index);
	};

	useEffect(() => {
		const { offsetLeft, offsetWidth } = tabsRefs[selectedTab].current;
		updateBorder(offsetLeft, offsetWidth);
	}, [selectedTab, tabsRefs]);

	const { links, content } = useMemo(() =>
		(React.Children.toArray(children) as React.ReactElement[])
			.reduce((result, tab, index) => {
				const { label, disabled, children } = (tab.props as ITabProps);
				const isSelected = index === selectedTab;

				result.links.push(
					<TabLink
						key={label}
						tabRef={tabsRefs[index]}
						label={label}
						disabled={disabled}
						selected={isSelected}
						onChange={() => handleTabChange(index, tab.props as ITabProps)}
					/>,
				);

				if (isSelected) {
					result.content = children;
				}

				return result;
			},
			{ links: [], content: null } as { links: React.ReactElement[]; content: React.ReactElement | null; },
			)
	, [selectedTab, children]);

	return (
		<TabsStyled>
			<TabsLinksContainer>
				{ links }
			</TabsLinksContainer>
			<TabSlider ref={sliderRef}/>
			<TabsContentsContainer>
				{ content }
			</TabsContentsContainer>
		</TabsStyled>
	);
};
