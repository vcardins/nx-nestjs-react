import { Themes } from '@xapp/shared/enums';
import { ITheme } from './ITheme';

export interface IThemeContext {
	theme?: ITheme;
	onChangeTheme: (theme: Themes) => void;
}
