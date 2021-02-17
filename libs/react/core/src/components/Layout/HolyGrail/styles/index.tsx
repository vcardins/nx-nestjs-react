import styled from 'styled-components';
import { Header } from './Header';
import { Sidenav, Profile, Brand, ActionLink } from './Sidenav';
import { Main } from './Main';
import { Footer } from './Footer';
import { MenuItemTitle } from '../../../Menu/styles';

const Container = styled.div`
	display: grid;
	grid-template: 'header' 'main';
	grid-template-columns: 100%;
	grid-template-rows: ${({theme}) => theme.sizes.header.height} 1fr;
	height: 100vh;

	@media ${({ theme }) => theme.devices.tablet} {
		grid-template-areas: 'sidenav header' 'sidenav main' 'sidenav footer';

		&[data-sidenav-collapsed='true'] {
			grid-template-columns: ${({theme}) => theme.sizes.sideNav.collapsed} calc(100% - ${({theme}) => theme.sizes.sideNav.collapsed});

			[data-menu-group="true"] {
				opacity: 0;
			}

			${Sidenav.Container} {
				width: ${({ theme }) => theme.sizes.sideNav.collapsed };

				[data-avatar] {
					height: 24px;
					width: 24px;
				}

				#sidenav-brand-close,
				${Profile.NameContainer},
				${Brand.Link},
				${MenuItemTitle} {
					opacity: 0;
				}
			}
		}

		&[data-sidenav-collapsed='false'] {
			grid-template-columns: ${({theme}) => theme.sizes.sideNav.expanded} calc(100% - ${({theme}) => theme.sizes.sideNav.expanded});

			${Profile.NameContainer},
			${Brand.Link},
			${MenuItemTitle} {
				opacity: 1;
				transition: opacity .25s ease-in-out;
			}

			${Sidenav.Container} {
				width: ${({ theme }) => theme.sizes.sideNav.expanded };
			}
		}

		${Sidenav.Container},
		${Main} {
			position: relative;
			transform: translateX(0);
		}
	}
`;

export {
	Container,
	Header,
	Sidenav,
	Brand,
	Profile,
	ActionLink,
	Main,
	Footer,
};
