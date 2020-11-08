import React, { useState, useRef } from 'react';
import Icon from 'react-icons-kit';

import { IDropdownItem } from '../../interfaces/IDropdownItem';
import { useOuterClickNotifier } from '../../hooks/useOuterClickNotifier';
import { DropdownItemTypes } from '../../enums/DropdownItemTypes';
import { DropdownSizeStyle } from './DropdownSizeStyle';
import {
	DropdownContainer,
	DropdownWrapper,
	DropdownLabel,
	DropdownListWrapper,
	DropdownListItem,
	DropdownAnchor,
	IconWrapper,
	LabelWrapper,
} from './styles';

interface IDropdownListProps {
	selectedItem?: string;
	options: IDropdownItem[];
	disabled?: boolean;
	size?: DropdownSizeStyle;
	closeOnSelect?: boolean;
}

interface IDropdownProps extends IDropdownListProps {
	children?: any;
	hideChevron?: boolean;
	label?: string;
	emptyValueLabel?: string;
	position?: 'right' | 'left';
	highlightOnHover?: boolean;
}

export const DropdownList = React.memo(({
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

	const hasTitle = options.some(({title}) => !!title);

	return (
		<DropdownListWrapper addSpacing={hasTitle}>
			{ options.map(({id, title, icon, iconOnly, href, onClick }) => {
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

const Dropdown = (props: IDropdownProps) => {
	const {
		children, hideChevron, size, label, disabled, options = [],
		emptyValueLabel, highlightOnHover, position = 'right',
	} = props;
	const innerRef = useRef(null);
	const [active, setActive] = useState(false);
	const toggleShow = () => setActive(!active);

	useOuterClickNotifier(
		() => setActive(false),
		innerRef,
	);

	if (!options.length) {
		return null;
	}

	const updatedOptions: IDropdownItem[] = !emptyValueLabel
		? options
		: [
			{ id: null, type: DropdownItemTypes.Divider, title: emptyValueLabel } as IDropdownItem,
		].concat(options);

	return (
		<DropdownContainer
			ref={innerRef}
			hideChevron={hideChevron}
			size={size}
			highlightOnHover={highlightOnHover}
		>
			{label && <DropdownLabel>{label}</DropdownLabel>}
			<button onClick={toggleShow}>
				{ children }
			</button>
			<DropdownWrapper data-active={active} position={position}>
				<DropdownList
					{...props}
					disabled={disabled}
					options={updatedOptions}
					onClose={() => setActive(false)}
				/>
			</DropdownWrapper>
		</DropdownContainer>
	);
};

export { Dropdown };
