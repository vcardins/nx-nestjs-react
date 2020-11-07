import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
`;

export const Header = styled.header`
	display: flex;
	padding: 1em;
	height: 50px;
	background-color: ${({ theme }) => theme.colors.tertiary.lighterGrey };
`;

export const Column1 = styled.div`
	flex-grow: 1;
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.primary.blue };
	color: ${({ theme }) => theme.colors.primary.white };
	content: '';
`;

export const Column2 = styled.div`
	display: flex;
	flex: 0.4;
	justify-content: center;
	align-items: center;
	overflow: auto;
	>* {
		width: 100%;
		margin: 2em;
	}
`;

