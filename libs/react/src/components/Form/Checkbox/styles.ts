// @ts-ignore
import { Field } from 'react-jsonschema-form-validation';
import styled from 'styled-components';

export const StyledCheckbox = styled(Field)`
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey };
	padding: 3px 5px;
	border-radius: 2px;
	outline: none;
`;
