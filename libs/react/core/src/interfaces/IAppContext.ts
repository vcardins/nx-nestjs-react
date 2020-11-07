import socketIOClient from 'socket.io-client';

import { IUserPreferences, IUserProfile } from '@xapp/shared/interfaces';
import { IRoute, IKeyedRoute } from '../interfaces/IRoute';
import { INavItem } from '../interfaces/INavItem';

export interface IAppContext<TDataContext> {
	activeRoute: IRoute;
	routes: IKeyedRoute;
	socket: typeof socketIOClient.Socket;
	userSettings: IUserPreferences;
	userProfile: IUserProfile;
	// lookup: ILookup;
	dataContext: TDataContext;
	navigation: INavItem[];
	onUpdateUserPreferences: (updates: Partial<IUserPreferences>) => void;
	onUpdateUserProfile: (updates: Partial<IUserProfile>) => void;
	onActivateRoute?: (value: IRoute, location: string) => void;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
}
