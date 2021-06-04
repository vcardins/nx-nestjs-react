import React from 'react';

import { StyledSelect } from './styles';
import { FieldSet } from '../FieldSet';
import { IHtmlField } from '../../../interfaces/IHtmlField';

type KeyType = string | number;

export interface ISelectField<T extends KeyType> extends IHtmlField {
	items: T[];
	size?: number;
	keyValueProps?: Record<string, T>;
}

function getOptions<T extends KeyType> (items: T[] = [], keyValueProps: Record<string, T>) {
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
	),
	);
}

export function Select<T extends KeyType> (props: ISelectField<T>) {
	const { id, name, label, value, items = [], keyValueProps } = props;
	const options = getOptions(items, keyValueProps);
	const selectElement = (
		<StyledSelect
			id={id || name}
			name={name}
			component="select"
			value={value}
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
