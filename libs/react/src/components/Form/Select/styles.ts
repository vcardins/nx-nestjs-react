import { Field } from 'react-jsonschema-form-validation';
import styled from 'styled-components';
import { fieldStyle } from '../styles';

export const StyledSelect = styled(Field)`
	${fieldStyle};
	&:not([size]) {
		display: block;
		padding: 0.25em 0.5em;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		border-radius: 3px;
		outline: none;

		&:disabled {
			color: ${({ theme }) => theme.colors.tertiary.grey };

			&:hover,
			[aria-disabled=true] {
				background-color: ${({ theme }) => theme.colors.tertiary.lighterGrey };
			}
		}
	}
`;
