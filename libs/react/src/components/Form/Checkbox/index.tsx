import React from 'react';

import { StyledCheckbox } from './styles';
import { FieldSet } from '../FieldSet';
import { IHtmlField } from '@xapp/shared/types';

interface ICheckbox extends IHtmlField {}

export function Checkbox ({ id, name, label, value, labelLess, sided = true }: ICheckbox) {
	const plainElement = (
		<StyledCheckbox
			id={id || name}
			type="checkbox"
			name={name}
			checked={value}
		/>
	);

	if (labelLess) {
		return plainElement;
	}

	return (
		<FieldSet name={name} label={label} sided={sided}>
			{ plainElement }
		</FieldSet>
	);
}
