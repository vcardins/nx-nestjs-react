import React, { FC, Context, createContext, useEffect, useState, useRef, useContext, useMemo } from 'react'; // , Dispatch, useReducer

import { IAppContext as ICommonAppContext, INavItem } from '@xapp/react/core';
import { ISignedUserOutput, IUserProfileInput, ILookup } from '@xapp/shared/interfaces';
import { useAuth } from '@xapp/react/auth';
import { appConfig } from '@xapp/shared/config';

import { TodoStore, AccountStore, LookupStore } from '../store';

interface IAppDataContext {
	todo: TodoStore;
	lookup: LookupStore;
	account: AccountStore;
}

type IAppContext = ICommonAppContext<IAppDataContext>;

const initialContext: IAppContext = {
	routes: {},
	activeRoute: null,
	user: null,
	lookup: null,
	navigation: null,
	dataContext: null,
	onUpdateUserProfile: () => null,
	onActivateRoute: () => null,
	onSignOut: () => null,
};

const AppContext: Context<IAppContext> = createContext<IAppContext>(initialContext);

interface IAppContextProviderProps {
	children: React.ReactNode;
	routes: IAppContext['routes'];
}

// const mainReducer = (
// 	{ todos }: InitialStateType,
// 	action: TodoActions,
// ) => ({
// 	todos: todoReducer(todos, action as TodoActions),
// 	// me: meReducer(me, action as MeActions),
// 	// config: configReducer(config, action as ConfigActions),
// });

const AppContextProvider: FC<IAppContextProviderProps> = ({ children, routes }: IAppContextProviderProps) => {
	// const [state, dispatch] = useReducer(mainReducer, initialState);
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const { accessToken, onSignOut, authHeader } = useAuth();
	const [user, setUser] = useState<ISignedUserOutput>(null);
	const [lookup, setLookup] = useState<ILookup>(null);
	const [dataContext, setDataContext] = useState<IAppDataContext>();

	// const [lookup, setLookup] = useState({} as ILookup);
	const [activeRoute, setActiveRoute] = useState(null);
	const [navigation, setNavigation] = useState<INavItem[]>([]);

	const ref = useRef(null);

	useEffect(() => {
		const bootstrap = async () => {
			// Make updates whether the previous stored user is different from the current one
			if (accessToken === ref.current) {
				return;
			}

			if (accessToken) {
				try {
					const dataStores = {
						todo: new TodoStore(authHeader),
						lookup: new LookupStore(authHeader),
						account: new AccountStore(authHeader, appConfig.endpoints),
					};

					const userInfo = await dataStores.account.getUserProfile();
					setLookup(await dataStores.lookup.read());
					setDataContext(dataStores);
					setUser(userInfo);
				}
				catch (e) {
					setUser(null);
				}
			}
			else {
				setNavigation([]);
				setUser(null);
			}

			ref.current = accessToken;
		};

		bootstrap();

		return () => {
			setUser(null);
		};
	}, [accessToken, authHeader]);

	const value = useMemo<IAppContext>(
		() => ({
			routes,
			activeRoute,
			navigation,
			user,
			lookup,
			dataContext,
			onUpdateUserProfile: (profile: IUserProfileInput) => setUser({ ...user, profile }),
			onActivateRoute: setActiveRoute,
			onSignOut,
		}),
		[routes, activeRoute, navigation, user, lookup, dataContext, onSignOut],
	);

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};

const useApp = () => useContext(AppContext);

export {
	AppContextProvider,
	AppContext as appContext,
	useApp,
};
