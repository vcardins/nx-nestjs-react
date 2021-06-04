import { IRoute, IKeyedRoute } from '../interfaces/IRoute';
import { INavItem } from '../interfaces/INavItem';

export interface IAppContext {
	activeRoute: IRoute;
	routes: IKeyedRoute;

	navigation: INavItem[];
	onActivateRoute?: (value: IRoute, location: string) => void;
	onSignOut: (isTriggeredByExpiredSession?: boolean) => Promise<void>;
}
