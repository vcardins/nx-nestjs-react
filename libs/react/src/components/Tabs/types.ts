import React from 'react';

export type ITabProps = Pick<ITabLinkProps, 'label' | 'disabled' | 'selected'>  & { children: React.ReactElement }

export interface ITabsProps {
	children: React.ReactElement | React.ReactElement[];
	onAfterChange?: (tab: ITabProps, index: number) => void;
}

export interface ITabLinkProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	tabRef?: React.RefObject<HTMLLIElement>;
	onChange: () => void;
}
