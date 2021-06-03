import { FieldError } from 'react-jsonschema-form-validation';
import styled, { css } from 'styled-components';

export const FieldGroup = styled.div<{sided?: boolean}>`
	display: flex;
	flex-direction: ${(p) => p.sided ? 'row' : 'column' };
	margin: 1em 0;
	${({ sided }) => sided
		? css`
			align-items: center;
			>* :not(:first-child) {
				margin-left: 0.75em;
			}
		`
		: css`
			>*{
				min-width: 7.5em;
				&:not(:first-child) {
					margin-top: 0.5em;
				}
			}
		`
};
`;

export const FieldLabel = styled.label`
	font-weight: bold;
	~ input[type="checkbox"] {
		margin-left: 0.5em;
	}
`;

export const StyledError = styled(FieldError)`
	color: ${({ theme }) => theme.colors.secondary.red};
	font-size: 11px;
`;
