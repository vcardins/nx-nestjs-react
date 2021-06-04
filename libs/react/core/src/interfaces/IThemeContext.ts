import { Themes } from '@xapp/shared';
import { ITheme } from './ITheme';

export interface IThemeContext {
	theme?: ITheme;
	onChangeTheme: (theme: Themes) => void;
}
