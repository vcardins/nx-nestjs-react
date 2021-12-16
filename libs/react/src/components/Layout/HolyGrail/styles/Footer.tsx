import styled from 'styled-components';;

export const Footer = styled.footer`
	grid-area: footer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 16px;
	color: ${({ theme }) => theme.colors.primary.blue };
	background-color: ${({ theme }) => theme.colors.primary.white};
`;
