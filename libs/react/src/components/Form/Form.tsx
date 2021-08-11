import { Form as AjvForm } from 'react-jsonschema-form-validation';
// import AjvErrors from 'ajv-errors';
import styled from 'styled-components';
import { FieldGroup } from './FieldSet';

// AjvErrors(AjvForm);

export const Form = styled(AjvForm)`
	padding: ${({ theme }) => theme.spacing.normal };

	${FieldGroup} {
		&:first-child { margin-top: 0 }
		&:last-child { margin-bottom: 0 }
	}
`;
