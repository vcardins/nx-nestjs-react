/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState } from 'react';
import { Wrapper, Container, IDropdownWrapper } from './styles';
import { useOnClickOutside } from '../../hooks';

interface IPopoverProps extends IDropdownWrapper {
	children?: React.ReactNode;
	content?: React.ReactElement;
}


export function Popover({ content, children, position }: IPopoverProps) {
	const [isVisible, setIsVisible] = useState(false);
	const nodeRef = useRef<HTMLDivElement>();

	// check to see if the user clicked outside of this component
	useOnClickOutside(nodeRef, () => {
		if (isVisible) {
			setIsVisible(false);
		}
	});

	return (
		<Wrapper ref={nodeRef}  position={position}>
			<div onClick={() => setIsVisible(!isVisible)} >
				{ children }
			</div>
			{isVisible && (
				<Container>
					{ content }
				</Container>
			)}
		</Wrapper>
	);
}
