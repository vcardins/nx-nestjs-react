import React from 'react';

import { StyledSelect } from './styles';
import { FieldSet } from '../FieldSet';
import { IHtmlField, KeyType } from '@xapp/shared/types';

interface IKeyValue {
	id: KeyType;
	name: string;
}

export interface ISelectField extends IHtmlField {
	emptyValueLabel?: string | null;
	items: IKeyValue[];
	size?: number;
	keyValueProps: Record<string, string>;
}

function getOptions (keyValueProps: ISelectField['keyValueProps'], items: ISelectField['items'] = []) {
	if (!keyValueProps) {
		throw new Error('keyValueProps is required for select components');
	}
	if (Object.keys(keyValueProps).length > 1 ) {
		throw new Error('keyValueProps should have only one key');
	}

	const key = Object.keys(keyValueProps)[0];
	const v = keyValueProps[key];

	return items.map((option: any) => (
		<option
			key={option[key]}
			value={option[key]}
		>
			{option[v]}
		</option>
	));
}

export function Select (props: ISelectField) {
	const { id, name, label, value, items = [], keyValueProps, emptyValueLabel = 'Please select' } = props;
	const allItems = !emptyValueLabel
		? items
		: [{ id: 0, name: emptyValueLabel } as IKeyValue].concat(items);
	const options = getOptions(keyValueProps, allItems);

	const selectElement = (
		<StyledSelect
			id={id || name}
			name={name}
			component="select"
			value={value || 0}
		>
			{ options }
		</StyledSelect>
	);

	if (props.labelLess) {
		return selectElement;
	}

	return (
		<FieldSet name={name} label={label}>
			{ selectElement }
		</FieldSet>
	);
}
