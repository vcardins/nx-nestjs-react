import React, { Context, createContext, ReactNode, useState } from 'react';
import { IThemeContext } from '../interfaces/IThemeContext';
import { getTheme } from '../theme/getTheme';
import { Themes } from '@xapp/shared';
import { appConfig } from '@xapp/shared/config';
import { ITheme } from '../interfaces/ITheme';

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
