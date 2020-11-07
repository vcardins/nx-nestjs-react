import React from 'react';

import { IHtmlField } from '../../../interfaces/IHtmlField';
import { FieldSet } from '../FieldSet';
import { StyledInput } from './styles';

type InputTypes = 'text' | 'password';

interface ITextInput extends IHtmlField {
	type? : InputTypes;
	component?: string | Element;
}

export function TextInput (props: ITextInput) {
	const { id, name, label, value, plain, type, component } = props;
	const plainElement = (
		<StyledInput
			id={id || name}
			name={name}
			value={value}
			type={type}
			component={component}
		/>
	);

	if (plain) {
		return plainElement;
	}

	return (
		<FieldSet name={name} label={label}>
			{ plainElement }
		</FieldSet>
	);
}
