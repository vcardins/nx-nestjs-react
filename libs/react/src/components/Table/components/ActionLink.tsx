/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';

export const Link = styled.a`
	display: inherit;
`;

interface IActionLinkProps {
	id?: string;
	label?: React.ReactNode;
	children?: React.ReactNode;
	onClick: () => void;
}

export function ActionLink({ id, label, children, onClick }: IActionLinkProps) {
	function handleClick(e: React.ChangeEvent<any>) {
		e.preventDefault();
		onClick?.();
	}

	return (
		<Link id={id} href="#" onClick={handleClick}>
			{ label ?? children }
		</Link>
	);
}
