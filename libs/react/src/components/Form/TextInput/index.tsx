import React from 'react';
import { Field } from 'react-jsonschema-form-validation';
import { IHtmlField } from '@xapp/shared/types';

import { FieldSet } from '../FieldSet';
import { StyledInput } from '../styles';

type InputTypes = 'text' | 'textarea' | 'password' | 'hidden' | 'number';

interface ITextInput extends IHtmlField {
	type? : InputTypes;
	component?: string | Element;
}

export function TextInput (props: ITextInput): React.ReactElement<any> {
	const { id, name, label, value, labelLess, type, component, disabled } = props;
	const fieldProps = {
		id: id || name,
		name,
		value,
		type,
		disabled,
	} as Field.IProps<string>;

	if (type === 'hidden') {
		return (
			<Field type="hidden" {...fieldProps} />
		);
	}

	const inputElement = (
		<StyledInput
			{...fieldProps}
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
