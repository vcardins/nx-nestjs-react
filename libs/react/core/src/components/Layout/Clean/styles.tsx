import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
`;

export const Header = styled.header`
	display: flex;
	padding: 1em;
	height: 50px;
	background-color: ${({ theme }) => theme.colors.tertiary.lightGrey };
`;

export const Content = styled.div`
	display: flex;
	flex: 1;
	background-color: ${({ theme }) => theme.colors.tertiary.lightestGrey };
`;
