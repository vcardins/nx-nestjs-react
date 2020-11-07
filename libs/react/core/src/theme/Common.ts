import { ITheme } from '../interfaces/ITheme';

const fonts: ITheme['fonts'] = {
	primary: 'Lato, sans-serif',
	pre: 'Courier, monospace',
	quote: 'Georgia, serif',
	icon: 'FontAwesome',
};

const lineHeights: ITheme['lineHeights'] = {
	solid: 1,
	title: 1.25,
	copy: 1.5,
};

const letterSpacings: ITheme['letterSpacings'] = {
	normal: 'normal',
	tracked: '0.1em',
	tight: '-0.05em',
	mega: '0.25em',
};

const borders: ITheme['borders'] = {
	none: 0,
	light: '1px solid',
	medium: '2px solid',
	strong: '4px solid',
};

const fontSizes: ITheme['fontSizes'] = [12, 14, 16, 20, 24, 36, 48, 80, 96];

const heading: ITheme['heading'] = {
	h1: '2em',
	h2: '1.5em',
	h3: '1.15em',
	h4: '1em',
	h5: '.75em',
	h6: '.5em',
};

const breakpoint: ITheme['breakpoint'] = {
	huge: '1440px',
	large: '1170px',
	medium: '768px',
	small: '450px',
	min: '320px',
};

const mediaSizes: ITheme['mediaSizes'] = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px',
	desktopL: '2560px',
};

const devices: ITheme['devices'] = {
	mobileS: `(min-width: ${mediaSizes.mobileS})`,
	mobileM: `(min-width: ${mediaSizes.mobileM})`,
	mobileL: `(min-width: ${mediaSizes.mobileL})`,
	tablet: `(min-width: ${mediaSizes.tablet})`,
	laptop: `(min-width: ${mediaSizes.laptop})`,
	laptopL: `(min-width: ${mediaSizes.laptopL})`,
	desktop: `(min-width: ${mediaSizes.desktop})`,
	desktopL: `(min-width: ${mediaSizes.desktop})`,
};

const shadows: ITheme['shadows'] = {
	light: '0 1px 1px rgba(0, 0, 0, 0.08)',
	normal: '0 1px 2px rgba(0, 0, 0, 0.12)',
	heavy: '1px 2px 2px rgba(0, 0, 0, 0.15)',
};

const space: ITheme['space'] = [
	// margin and padding
	0, 4, 8, 16, 24, 32, 48, 64,
];

const spacing: ITheme['spacing'] = {
	none: 0,
	mini: '0.25em',
	small: '0.5em',
	normal: '1em',
	medium: '1.5em',
	large: '2em',
	larger: '3em',
	largest: '4em',
};

const sizes: ITheme['sizes'] = {
	width: {
		max: '1366px',
		min: '768px',
	},
	header: {
		height: '50px',
	},
	sideNav : {
		expanded: '220px',
		collapsed: '50px',
		profile: '60px',
		footer: '40px',
	},
	footer: {
		height: '40px',
	},
	icon: {
		regular: '24px',
		small: '16px',
	},
	radius: '3px',
	topBar: '40px',
	titleBar: '60px',
	toolBar: '50px',
	listPanel: {
		default: '450px',
		small: '384px',
	},
};

const radii = [0, 2, 4, 8];

export const Common: Omit<ITheme, 'colors' | 'palette'> = {
	devices,
	fonts,
	sizes,
	shadows,
	lineHeights,
	letterSpacings,
	borders,
	fontSizes,
	space,
	spacing,
	heading,
	radii,
	breakpoint,
};
