// @ts-ignore
import { Field } from 'react-jsonschema-form-validation';
import styled from 'styled-components';

export const StyledInput = styled(Field)`
	border: 1px solid ${({ theme }) => theme.colors.tertiary.lightGrey };
	line-height: 1.25;
	padding: 5px 10px;
	border-radius: 2px;
	outline: none;

	&:hover {
		border-color: ${({ theme }) => theme.colors.tertiary.grey };
	}
`;
