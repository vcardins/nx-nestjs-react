import React from 'react';
import styled from 'styled-components';

interface IWrapperProps {
	width?: string | number;
	unit?: string;
}

interface IProps extends IWrapperProps {
	children: React.ReactNode;
}

const Wrapper = styled.div`
	width: ${({width, unit}: IWrapperProps) => `${width}${unit}`};
	margin: 0 auto;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const Center = ({ width = 400, unit = 'px', children }: IProps) => (
	<Wrapper width={width} unit={unit}>
		{ children }
	</Wrapper>
);

export { Center };
