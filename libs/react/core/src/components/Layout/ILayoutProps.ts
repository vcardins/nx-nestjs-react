import { ISignedUserOutput } from '@xapp/shared/interfaces';
import { IRoute } from '../../interfaces/IRoute';
export interface ILayoutProps {
	id: string;
	renderedRoutes: JSX.Element;
	activeRoute: IRoute;
	userMenu?: JSX.Element;
	sideMenu?: JSX.Element;
	user: ISignedUserOutput;
	onSignOut: () => Promise<void>;
}
