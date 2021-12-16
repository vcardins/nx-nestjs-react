import React from 'react';
import styled from 'styled-components';
import { Loader } from '.';

const LoadingWrapper = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoadingText = styled.span`
	margin-left: 0.5em;
`;

export const Loading = ({ message = 'Loading' }: { message?: string }) => (
	<LoadingWrapper>
		<Loader size="10px" />
		<LoadingText>{message}</LoadingText>
	</LoadingWrapper>
);
