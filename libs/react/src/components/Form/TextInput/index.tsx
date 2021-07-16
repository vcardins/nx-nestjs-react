import React from 'react';
import { Field } from 'react-jsonschema-form-validation';
import { IHtmlField } from '@xapp/shared/types';

import { FieldSet } from '../FieldSet';
import { StyledInput } from './styles';

type InputTypes = 'text' | 'password' | 'hidden' | 'number';

interface ITextInput extends IHtmlField {
	type? : InputTypes;
	component?: string | Element;
}

export function TextInput (props: ITextInput) {
	const { id, name, label, value, labelLess, type, component, disabled } = props;

	if (type === 'hidden') {
		return (
			<Field type="hidden" value={value} />
		);
	}

	const inputElement = (
		<StyledInput
			id={id || name}
			name={name}
			value={value}
			type={type}
			disabled={disabled}
			component={component}
		/>
	);

	if (labelLess) {
		return inputElement;
	}

	return (
		<FieldSet name={name} label={label}>
			{ inputElement }
		</FieldSet>
	);
}
