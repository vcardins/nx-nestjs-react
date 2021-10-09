// import original module declarations
import 'styled-components';

interface Breakpoint {
	huge: string;
	large: string;
	medium: string;
	small: string;
	min: string;
}

interface Heading {
	h1: string;
	h2: string;
	h3: string;
	h4: string;
	h5: string;
	h6: string;
}

interface Spacing {
	none: number;
	mini: string;
	small: string;
	normal: string;
	medium: string;
	large: string;
	larger: string;
	largest: string;
}

interface Borders {
	none: number;
	light: string;
	medium: string;
	strong: string;
}

interface LetterSpacings {
	normal: string;
	tracked: string;
	tight: string;
	mega: string;
}

interface LineHeights {
	solid: number;
	title: number;
	copy: number;
}

interface Shadows {
	light: string;
	normal: string;
	heavy: string;
}

interface ListPanel {
	default: string;
	small: string;
}

interface Icon {
	regular: string;
	small: string;
}

interface Width {
	max: string;
	min: string;
}

interface Sidenav {
	expanded: string;
	collapsed: string;
	profile: string;
	footer: string;
}

interface Dimension {
	height: string;
}

interface Sizes {
	width: Width;
	icon: Icon;
	header: Dimension;
	footer?: Dimension;
	sideNav: Sidenav;
	radius: string;
	topBar: string;
	titleBar: string;
	toolBar: string;
	listPanel: ListPanel;
}


interface Fonts {
	primary: string;
	pre: string;
	quote: string;
	icon: string;
}

export interface PrimaryTones {
	lightest?: string;
	lighter?: string;
	light?: string;
	moderate?: string;
}

interface Tertiary {
	xLightestGrey?: string;
	lightestGrey?: string;
	lighterGrey?: string;
	lightGrey?: string;
	grey?: string;
	midGrey?: string;
	deepGrey?: string;
}

interface Secondary {
	lightBlue?: string;
	blue?: string;
	midBlue?: string;
	lightGreen?: string;
	green?: string;
	lightYellow?: string;
	yellow?: string;
	lightPurple?: string;
	purple?: string;
	lightRed?: string;
	red?: string;
	darkRed?: string;
}

interface Primary {
	blue?: string;
	green?: string;
	cyan?: string;
	white?: string;
	dark?: string;
}

interface Palette {
	primary?: string[];
	secondary?: string[];
	tertiary?: string[];
}

interface Colors {
	primary: Primary;
	secondary: Secondary;
	tertiary: Tertiary;
	primaryTones: PrimaryTones;
}

interface Device {
	mobileS: string;
	mobileM: string;
	mobileL: string;
	tablet: string;
	laptop: string;
	laptopL: string;
	desktop: string;
	desktopL: string;
}

// and extend them!
declare module 'styled-components' {
	export interface ITheme {
		palette: Palette;
		colors: Colors;
		fonts: Fonts;
		sizes: Sizes;
		shadows: Shadows;
		lineHeights: LineHeights;
		letterSpacings: LetterSpacings;
		borders: Borders;
		fontSizes: number[];
		space: number[];
		spacing: Spacing;
		heading: Heading;
		radii: number[];
		breakpoint: Breakpoint;
		devices?: Device;
		mediaSizes?: Device;
	}
}
