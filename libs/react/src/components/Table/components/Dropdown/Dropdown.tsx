/* eslint-disable react/display-name */
import React, { useState, useRef } from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IDropdownProps, IDropdownListProps, HorizontalPosition } from './types';
import {
	DropdownWrapper,
	DropdownContent,
	DropdownListWrapper,
	DropdownListItem,
	DropdownAnchor,
	DropdownTitle,
	DropdownFooter,
	DropdownContainer,
	DropdownTrigger,
	LabelWrapper,
} from './styles';

export const Dropdown = (props: IDropdownProps) => {
	const { trigger, children, padded = true, title, footer, position, width, height, hideChevron } = props;
	const innerRef = useRef(null);
	const [active, setActive] = useState(false);
	const toggleShow = () => setActive(!active);

	useOnClickOutside(innerRef, () => setActive(false));

	return (
		<DropdownWrapper ref={innerRef}>
			<DropdownTrigger
				hideChevron={hideChevron}
				onClick={toggleShow}
			>
				{trigger}
			</DropdownTrigger>
			<DropdownContainer
				active={active}
				position={position || HorizontalPosition.Right}
				width={width}
				height={height}
				padded={padded}
			>
				{ title && <DropdownTitle>{title}</DropdownTitle> }
				<DropdownContent hasTitle={!!title} hasFooter={!!footer}>
					{ children }
				</DropdownContent>
				{ footer && <DropdownFooter>{footer}</DropdownFooter> }
			</DropdownContainer>
		</DropdownWrapper>
	);
};

export const DropdownList = React.memo(({ columns, showCheckbox, options = [], onSelect, selectedItems }: IDropdownListProps) => (
	<DropdownListWrapper columns={columns}>
		{options.map(({ id, label, value, disabled }) => {
			const elemId = `column-toggler-${id}`;
			const selected = selectedItems.includes(id);

			return (
				<DropdownAnchor key={id} htmlFor={elemId}>
					<DropdownListItem
						title={label}
						selected={selected}
						showCheckbox={showCheckbox}
						onClick={showCheckbox ? undefined : () => onSelect(value, !selected)}
					>
						{ showCheckbox && (
							<input
								id={elemId}
								type="checkbox"
								checked={selected}
								disabled={disabled}
								onChange={(e) => onSelect(value, e.target.checked)}
							/>
						)}
						<LabelWrapper>
							{label}
						</LabelWrapper>
					</DropdownListItem>
				</DropdownAnchor>
			);
		})}
	</DropdownListWrapper>
));
