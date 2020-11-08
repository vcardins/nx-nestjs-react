import { Socket } from 'socket.io-client/build/socket';

import { IUserProfileInput, ISignedUserOutput, ILookup } from '@xapp/shared/interfaces';
import { IRoute, IKeyedRoute } from '../interfaces/IRoute';
import { INavItem } from '../interfaces/INavItem';

export interface IAppContext<TDataContext> {
	activeRoute: IRoute;
	routes: IKeyedRoute;
	socket: Socket;
	user: ISignedUserOutput;
	lookup: ILookup;
	dataContext: TDataContext;
	navigation: INavItem[];
	onUpdateUserProfile: (updates: Partial<IUserProfileInput>) => void;
	onActivateRoute?: (value: IRoute, location: string) => void;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
}
