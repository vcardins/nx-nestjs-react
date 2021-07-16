import { Field } from 'react-jsonschema-form-validation';
import styled from 'styled-components';

export const StyledSelect = styled(Field)`
	&:not([size]) {
		display: block;
		padding: 5px 10px;
		width: 100%;
		max-width: 100%;
		box-sizing: border-box;
		margin: 0;
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
