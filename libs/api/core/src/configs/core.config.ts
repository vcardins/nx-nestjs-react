import { ICoreConfig } from '../interfaces';

export const DEFAULT_CORE_CONFIG: ICoreConfig = {
	port: 5000,
	protocol: 'http',
	domain: 'localhost',
};

export const CORE_CONFIG_TOKEN = 'CoreConfigToken';
