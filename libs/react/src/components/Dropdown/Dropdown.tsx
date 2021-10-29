/* eslint-disable react/display-name */
import React from 'react';

import { DropdownItemTypes, Positioning, IListItem } from '@xapp/shared/types';
import { Popover, ListItems } from '../';
import { IDropdownListProps } from './types';

export const Dropdown = (props: IDropdownListProps) => {
	const { children, hideChevron, options = [], emptyValueLabel, position = Positioning.Right } = props;

	if (!options.length) {
		return null;
	}

	const updatedOptions: IListItem[] = !emptyValueLabel
		? options
		: [{ key: null, type: DropdownItemTypes.Divider, label: emptyValueLabel } as IListItem].concat(options);

	return (
		<Popover
			hideChevron={hideChevron}
			trigger={children}
			position={position}
		>
			<ListItems
				{...props}
				items={updatedOptions}
			/>
		</Popover>
	);
};
