/* eslint-disable react/display-name */
import React from 'react';

import { DropdownItemTypes, IDropdownItem } from '@xapp/shared/types';
import {
	DropdownListWrapper,
	DropdownListItem,
	DropdownAnchor,
	IconWrapper,
	LabelWrapper,
} from './styles';
import { Icon } from '../../components/Icon';
import { Dropdown } from './';
import { IDropdownListProps, DropdownSizeStyle } from './types';

const DropdownListItems = React.memo(({
	options = [],
	size,
	disabled,
	closeOnSelect = true,
	selectedItem,
	onClose,
}: IDropdownListProps & {onClose: () => void}) => {
	const handleClick = (onClick: () => void) => {
		if (disabled) return;

		onClick();
		if (closeOnSelect) {
			onClose();
		}
	};

	const hasTitle = options.some(({ title }) => !!title);

	return (
		<DropdownListWrapper addSpacing={hasTitle}>
			{ options.map(({ id, title, icon, iconOnly, href, onClick }) => {
				const content = (
					<>
						{icon && (
							<IconWrapper>
								<Icon
									icon={icon}
									size={size === DropdownSizeStyle.Default ? 20 : 16}
								/>
							</IconWrapper>
						)}
						{title && !iconOnly && <LabelWrapper>{title}</LabelWrapper>}
					</>
				);

				return (
					<DropdownListItem
						key={id}
						id={id}
						title={iconOnly ? title : undefined}
						onClick={() => onClick ? handleClick(onClick) : undefined}
						data-selected={id === selectedItem}
					>
						{!href
							? content
							: (
								<DropdownAnchor href={href}>{content}</DropdownAnchor>
							)
						}
					</DropdownListItem>
				);
			})}
		</DropdownListWrapper>
	);
});

export const DropdownList = (props: IDropdownListProps) => {
	const {
		children, hideChevron, size, label, disabled, options = [],
		emptyValueLabel, highlightOnHover, position = 'right',
	} = props;

	if (!options.length) {
		return null;
	}

	const updatedOptions: IDropdownItem[] = !emptyValueLabel
		? options
		: [{ id: null, type: DropdownItemTypes.Divider, title: emptyValueLabel } as IDropdownItem].concat(options);

	return (
		<Dropdown
			hideChevron={hideChevron}
			size={size}
			highlightOnHover={highlightOnHover}
			label={label}
			trigger={children}
			position={position}
		>
			{(onClose) => (
				<DropdownListItems
					{...props}
					disabled={disabled}
					options={updatedOptions}
					onClose={onClose}
				/>
			)}
		</Dropdown>
	);
};
