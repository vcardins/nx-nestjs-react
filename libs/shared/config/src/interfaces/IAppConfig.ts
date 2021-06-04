import { IEndpointsConfig } from './IEndpointsConfig';
import { IRouteUriConfig } from './IRouteUriConfig';
import { IRestApiHeaderConfig } from './IRestApiHeaderConfig';

export interface IAppConfig {
	code?: string;
	name: string;
	title: string;
	description: string;
	version: string;
	analyticsId?: string;
	theme?: string;
	routes: IRouteUriConfig;
	endpoints: IEndpointsConfig;
	apiMeta: IRestApiHeaderConfig;
}
