/* eslint-disable react/display-name */
import React, { useState, useRef } from 'react';

import { useOuterClickNotifier } from '../../hooks/useOuterClickNotifier';
import { DropdownWrapper, DropdownContent, DropdownLabel, DropdownContainer, DropdownTrigger } from './styles';
import { IDropdownProps } from './types';

export const Dropdown = (props: IDropdownProps) => {
	const { trigger, children, size, label, position = 'right', hideChevron } = props;
	const innerRef = useRef(null);
	const [active, setActive] = useState(false);
	const toggleShow = () => setActive(!active);

	useOuterClickNotifier(
		() => setActive(false),
		innerRef,
	);

	return (
		<DropdownWrapper
			ref={innerRef}
			hideChevron={hideChevron}
			size={size}
			highlightOnHover={false}
		>
			<DropdownTrigger onClick={toggleShow}>{ trigger }</DropdownTrigger>
			<DropdownContent data-active={active} position={position}>
				{label && <DropdownLabel>{label}</DropdownLabel>}
				{ children(toggleShow) }
			</DropdownContent>
		</DropdownWrapper>
	);
};
