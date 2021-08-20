import React from 'react';
import styled, { css } from 'styled-components';

export interface ITabLinkProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	onChange: () => void;
}

const TabItem = styled.li<Pick<ITabLinkProps, 'selected' | 'disabled'>>`
	${({ selected, disabled }) => selected && !disabled && css`
		border-bottom: 2px solid red;
		font-weight: bold;
	`}
	${({ disabled }) => !disabled && css`
		cursor: pointer;
	`}
	color: ${({ disabled }) => disabled ? 'lightgray' : 'inherit'};
	justify-content: center;
	align-items: center;

	&:not(:last-child) {
		margin-right: 1em;
	}
`;

export const TabLink = ({ selected, disabled, label, onChange }: ITabLinkProps) => (
	<TabItem
		selected={selected}
		disabled={disabled}
		title={label}
		onClick={() => !disabled ? onChange() : undefined}
	>
		{ label }
	</TabItem>
);
