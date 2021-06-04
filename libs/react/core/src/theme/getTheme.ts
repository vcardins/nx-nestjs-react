import { Light } from './Light';
import { Dark } from './Dark';
import { ITheme } from '../interfaces/ITheme';
import { Themes } from '@xapp/shared';

export function getTheme(theme: Themes = Themes.Light): ITheme {
	return theme === Themes.Dark
		? Dark
		: Light;
}
