import React from 'react';

import {
	FieldGroup,
	FieldLabel,
	StyledError,
} from './styles';

interface IFieldSet {
	name: string;
	label: string;
	sided?: boolean;
	children?: React.ReactNode;
}

export { FieldGroup };

// we can abstract a generic "FieldSet" component for most of our inputs.
export const FieldSet = ({
	name,
	label,
	sided,
	children,
}: IFieldSet) => (
	<FieldGroup sided={sided}>
		<FieldLabel htmlFor={name}>
			{label}
		</FieldLabel>
		{ children }
		<StyledError name={name} />
	</FieldGroup>
);
