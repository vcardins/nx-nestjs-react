import { Light } from './Light';
import { Dark } from './Dark';
import { ITheme, Themes } from '@xapp/shared/types';

export function getTheme(theme: Themes = Themes.Light): ITheme {
	return theme === Themes.Dark
		? Dark
		: Light;
}
