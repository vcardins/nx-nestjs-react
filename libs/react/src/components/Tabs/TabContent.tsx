import React from 'react';
import styled from 'styled-components';

const TabItem = styled.div`
	padding: 0.5em 0;
`;

export const TabContent = ({ children }: { children: React.ReactNode }) => (
	<TabItem>
		{ children }
	</TabItem>
);
