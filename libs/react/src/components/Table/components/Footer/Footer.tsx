/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';

import { IColumnHeader } from '@xapp/shared/types';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0.25em 0.5em;
	border-bottom: 1px solid #eee;
`;

interface ITableFooterProps {
	id?: string;
	columns?: IColumnHeader[];
}

export const Footer = React.memo(function Footer({ id, columns }: ITableFooterProps) {
	return (
		<Wrapper id={id}>
			Footer
		</Wrapper>
	);
});

