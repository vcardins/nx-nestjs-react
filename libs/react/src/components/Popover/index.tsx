/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '../../hooks';

import { PopoverWrapper, PopoverContainer } from './styles';
import { IPopoverProps } from './types';

export const Popover = ({ content, children, position }: IPopoverProps) => {
	const [isVisible, setIsVisible] = useState(false);
	const nodeRef = useRef<HTMLDivElement>();

	// check to see if the user clicked outside of this component
	useOnClickOutside(nodeRef, () => setIsVisible(false));

	return (
		<PopoverWrapper ref={nodeRef}  position={position}>
			<span onClick={() => setIsVisible(!isVisible)} >
				{ children }
			</span>
			{isVisible && (
				<PopoverContainer>
					{ content }
				</PopoverContainer>
			)}
		</PopoverWrapper>
	);
}
