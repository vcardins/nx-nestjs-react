import { rgb, hsl, lighten, desaturate } from 'polished';
import { ITheme } from '../interfaces/ITheme';
import { Common } from './Common';

const primaryColor = rgb(57, 66, 99);
const green = hsl(150, 1, 0.65);
const cyan = hsl(180, 0.78, 0.63);
const white = hsl(0, 0.0, 1);
const dark = hsl(0, 0.0, 0.20); // "black"

const primary = {
	blue: primaryColor,
	green,
	cyan,
	white,
	dark,
};

const secondary = {
	lightBlue: lighten(0.73, primaryColor),
	blue: lighten(0.2, desaturate(.07, primaryColor)),
	midBlue: hsl(210, 1, 0.50),

	lightGreen: hsl(120, 1, 0.95),
	green: desaturate(.07, green),

	lightYellow: hsl(60, 1, 0.95),
	yellow: hsl(42, 1, 1),

	lightPurple: hsl(220, 0.58, 0.90),
	purple: hsl(282, 0.80, 0.63),

	lightRed: hsl(0, 1, 0.97),
	red: hsl(353, 0.84, 0.84),
	darkRed: hsl(0, 0.80, 0.30),
};

const tertiary = {
	xLightestGrey: lighten(0.79, dark),
	lightestGrey: lighten(0.77, dark),
	lighterGrey: lighten(0.72, dark),
	lightGrey: lighten(0.62, dark),
	grey: lighten(0.40, dark),
	midGrey: lighten(0.50, dark),
	deepGrey: lighten(0.27, dark),
};

const tones = {
	lightest: 0.95,
	lighter: 0.8,
	light: 0.7,
	moderate: 0.5,
};

const palette = {
	primary: Object.values(primary),
	secondary: Object.values(secondary),
	tertiary: Object.values(tertiary),
};

const colors = {
	primary,
	secondary,
	tertiary,
	primaryTones: Object.keys(tones).reduce((acc, key) => {
		// eslint-disable-next-line immutable/no-mutation
		acc[key] = lighten(tones[key], primaryColor);
		return acc;
	}, {}),
};

export const Dark: ITheme = {
	...Common,
	palette,
	colors,
};
