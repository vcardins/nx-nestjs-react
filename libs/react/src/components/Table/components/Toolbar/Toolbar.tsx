import React from 'react';
import styled from 'styled-components';

import { IColumnInfo } from '@xapp/shared/types';
import { Dropdown, DropdownList } from '../Dropdown';
import { Columns as TableIcon, Filters as FiltersIcon } from '../Icons';

import { useColumnToggle } from './useColumnToggle';
import { ITableProps } from '../../types';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	padding: 0.25em 1em;
	user-select: none;
	> :not(:last-child) {
		margin-right: 0.75em
	}
`;

interface ITableToolbarProps extends Pick<ITableProps, 'filtersForm' | 'id' | 'columns'> {
	onToggleColumnDisplay?: (key: IColumnInfo['key'], visible: boolean) => void;
}

export const Toolbar = React.memo(function Toolbar(props: ITableToolbarProps) {
	const { id, columns, onToggleColumnDisplay, filtersForm } = props;
	const showColumnDisplayToggle = typeof onToggleColumnDisplay === 'function';
	const showItemsFilter = React.isValidElement(filtersForm);

	const columnsToggler = useColumnToggle(columns, showColumnDisplayToggle);

	if (!showColumnDisplayToggle && !showItemsFilter) {
		return null;
	}

	return (
		<Wrapper id={id}>
			{ showItemsFilter && (
				<Dropdown
					trigger={<FiltersIcon/>}
					padded={false}
					title="Filters"
				>
					{ filtersForm }
				</Dropdown>
			)}
			{showColumnDisplayToggle && (
				<Dropdown
					title="Columns Toggler"
					trigger={<TableIcon/>}
				>
					<DropdownList
						showCheckbox={true}
						columns={columnsToggler.columnsDisplay}
						options={columnsToggler.options}
						selectedItems={columnsToggler.selectedItems}
						onSelect={onToggleColumnDisplay}
					/>
				</Dropdown>
			)}
		</Wrapper>
	);
});
