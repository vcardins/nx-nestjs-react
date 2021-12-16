import React, { Context, createContext, ReactNode, useState } from 'react';
import { ITheme, Themes } from '@xapp/shared/types';
import { appConfig, getTheme } from '@xapp/shared/config';

export interface IThemeContext {
	theme?: ITheme;
	onChangeTheme: (theme: Themes) => void;
}


const initialContext: IThemeContext = {
	theme: {} as ITheme,
	onChangeTheme: () => console.error('Not implemented'),
};

const themeContext: Context<IThemeContext> = createContext<IThemeContext>(
	initialContext,
);

const { Provider } = themeContext;

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ITheme>(getTheme(appConfig.theme as Themes));

	function handleChangeTheme(theme: Themes) {
		setTheme(getTheme(theme));
	}

	return (
		<Provider
			value={{
				theme,
				onChangeTheme: handleChangeTheme,
			}}
		>
			{children}
		</Provider>
	);
};

export {
	ThemeContextProvider,
	themeContext,
};
