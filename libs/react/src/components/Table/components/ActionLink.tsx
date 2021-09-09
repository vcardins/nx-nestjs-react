/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(NavLink)`
	display: flex;
	width: 100%;
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
		<Link id={id} to="#" onClick={handleClick}>
			{ label ?? children }
		</Link>
	);
}
