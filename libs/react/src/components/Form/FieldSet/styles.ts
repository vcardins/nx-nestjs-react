import { FieldError } from 'react-jsonschema-form-validation';
import styled, { css } from 'styled-components';

export const FieldGroup = styled.div<{ sided?: boolean; padded?: boolean }>`
	display: flex;
	flex-direction: ${(p) => p.sided ? 'row' : 'column' };
	flex: 1;
	&:not(:last-child) {
		margin-bottom: 0.5em;
	}

	${({ padded }) => padded && css`margin: 1em 0;`}
	${({ sided }) => sided
		? css`
			align-items: center;
			>* :not(:first-child) {
				margin-left: 0.75em;
			}
		`
		: css`
			>*{
				width: inherit;
				&:not(:first-child) {
					margin-top: 0.25em;
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
