import styled from 'styled-components';
import { Icon } from '../../../Icon';

const HeaderContainer = styled.header`
	grid-area: header;
	display: flex;
	align-items: center;
	padding: 0 ${({ theme }) => `${theme.spacing.large} 0 ${theme.spacing.small}`};
	box-shadow: 1px 1px 2px 1px rgba(36, 36, 36, 0.15);
	z-index: 1;
`;


type TypeId = {id?: string};

/* Link Styles */
export const SidebarToggle = styled(Icon).attrs<TypeId>(({ id }) => ({ id }))`
	/* color: rgba(255, 255, 255, 0.75); */
`;

const HeaderSearch = styled.div`
	input {
		border: none;
		background: transparent;
		font-size: 16px;
		min-width: 200px;
		color: ${({ theme }) => theme.colors.primary.blue};

		&:focus {
			outline: none;
			border: none;
		}
	}
`;

const HeaderProfile = styled.div`
	margin-left: auto;
`;

const HeaderMenu = styled.div`
	padding-right: ${({ theme }) => theme.spacing.normal };
	border-radius: 50%;
	z-index: 1;
	line-height: 0;

	&:hover {
		cursor: pointer;
	}
`;

export const Header = {
	Container: HeaderContainer,
	Search: HeaderSearch,
	Profile: HeaderProfile,
	Menu: HeaderMenu,
};
