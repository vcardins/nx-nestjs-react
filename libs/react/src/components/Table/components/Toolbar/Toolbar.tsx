import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ITableColumn } from '../../types';
import { Dropdown, DropdownList } from '../Dropdown';
import { Columns as TableIcon, Filters as FiltersIcon } from '../Icons';

import { useColumnToggle } from './useColumnToggle';
// import { useRowsFilter } from './useRowsFilter';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0.25em 1em;
	border-bottom: 1px solid #eee;
	> :not(:last-child) {
		margin-right: 0.75em
	}
`;

interface ITableToolbarProps {
	id?: string;
	columns?: ITableColumn[];
	onToggleColumnDisplay?: (key: ITableColumn['key'], visible: boolean) => void;
	filters?: any;
	onFilter?: () => void;
}

export const Toolbar = React.memo(function Toolbar(props: ITableToolbarProps) {
	const { id, columns, onToggleColumnDisplay, filters, onFilter } = props;
	const showColumnDisplayToggle = typeof onToggleColumnDisplay === 'function';
	const showItemsFilter = typeof onFilter === 'function';

	const columnsToggler = useColumnToggle(columns, showColumnDisplayToggle);

	if (!showColumnDisplayToggle && !showItemsFilter) {
		return null;
	}

	return (
		<Wrapper id={id}>
			{ showItemsFilter && (
				<Dropdown
					title="Filters"
					trigger={<FiltersIcon/>}
					footer={<button onClick={() => onFilter()}>Filter</button>}
				>
					{filters}
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

