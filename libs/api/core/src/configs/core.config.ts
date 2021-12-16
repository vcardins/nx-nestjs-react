import { IRestApiConfig } from '../interfaces';

export const DEFAULT_CORE_CONFIG: IRestApiConfig = {
	port: 5000,
	protocol: 'http',
	domain: 'localhost',
};

export const CORE_CONFIG_TOKEN = 'CoreConfigToken';
