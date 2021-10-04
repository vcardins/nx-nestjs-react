/* eslint-disable @typescript-eslint/no-use-before-define */
import { Positioning } from '@xapp/shared/types';
import React, { useRef, useState } from 'react';

import { useOnClickOutside } from '../../hooks';

import {
	PopoverWrapper,
	PopoverContent,
	PopoverTitle,
	PopoverFooter,
	PopoverContainer,
	PopoverTrigger,
} from './styles';
import { IPopoverProps } from './types';

export const Popover = (props: IPopoverProps) => {
	const { trigger, children, padded = true, title, footer, position, width, height, hideChevron = true } = props;
	const innerRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const toggleShow = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);

	useOnClickOutside(innerRef, handleClose);

	return (
		<PopoverWrapper ref={innerRef}>
			<PopoverTrigger
				hideChevron={hideChevron}
				onClick={toggleShow}
			>
				{trigger}
			</PopoverTrigger>
			<PopoverContainer
				isOpen={isOpen}
				position={position || Positioning.Right}
				width={width}
				height={height}
				padded={padded}
			>
				{ title && <PopoverTitle>{title}</PopoverTitle> }
				<PopoverContent hasTitle={!!title} hasFooter={!!footer}>
					{ typeof children === 'function'
						? children(handleClose)
						: children }
				</PopoverContent>
				{ footer && <PopoverFooter>{footer}</PopoverFooter> }
			</PopoverContainer>
		</PopoverWrapper>
	);
};
