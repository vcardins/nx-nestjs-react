/* eslint-disable react/display-name */
import React from 'react';

import { IListItem } from '@xapp/shared/types';
import { ListItemsWrapper, ListItem, ListItemLabel, ListItemLabelWrapper } from './styles';

export interface IListItemsProps {
	columnsCount?: number;
	showCheckbox?: boolean;
	selectedItems?: IListItem['value'][];
	items?: IListItem[];
	onSelect?: (value: IListItem['value'], checked?: boolean) => void;
}

export const ListItems = React.memo(({ columnsCount = 1, showCheckbox = false, items = [], onSelect, selectedItems }: IListItemsProps) => (
	<ListItemsWrapper columns={columnsCount}>
		{items.map(({ id, label, value, disabled }) => {
			const elemId = `column-toggler-${id}`;
			const selected = selectedItems.includes(id);

			return (
				<ListItemLabel key={id} htmlFor={elemId}>
					<ListItem
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
						<ListItemLabelWrapper>
							{label}
						</ListItemLabelWrapper>
					</ListItem>
				</ListItemLabel>
			);
		})}
	</ListItemsWrapper>
));

// import { Icon } from '../../components/Icon';
// const DropdownListItems = React.memo(({
// 	options = [],
// 	size,
// 	disabled,
// 	closeOnSelect = true,
// 	selectedItem,
// 	onClose,
// }: IDropdownListProps & {onClose: () => void}) => {
// 	const handleClick = (onClick: () => void) => {
// 		if (disabled) return;

// 		onClick();
// 		if (closeOnSelect) {
// 			onClose();
// 		}
// 	};

// 	const hasTitle = options.some(({ title }) => !!title);

// 	return (
// 		<DropdownListWrapper addSpacing={hasTitle}>
// 			{ options.map(({ id, title, icon, iconOnly, href, onClick }) => {
// 				const content = (
// 					<>
// 						{icon && (
// 							<IconWrapper>
// 								<Icon
// 									icon={icon}
// 									size={size === DropdownSizeStyle.Default ? 20 : 16}
// 								/>
// 							</IconWrapper>
// 						)}
// 						{title && !iconOnly && <LabelWrapper>{title}</LabelWrapper>}
// 					</>
// 				);

// 				return (
// 					<DropdownListItem
// 						key={id}
// 						id={id}
// 						title={iconOnly ? title : undefined}
// 						onClick={() => onClick ? handleClick(onClick) : undefined}
// 						data-selected={id === selectedItem}
// 					>
// 						{!href
// 							? content
// 							: (
// 								<DropdownAnchor href={href}>{content}</DropdownAnchor>
// 							)
// 						}
// 					</DropdownListItem>
// 				);
// 			})}
// 		</DropdownListWrapper>
// 	);
// });
