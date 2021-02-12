import { Form as AjvForm } from 'react-jsonschema-form-validation';
import styled from 'styled-components';

export const Form = styled(AjvForm)`
	padding: ${({ theme }) => theme.spacing.normal };
`;

