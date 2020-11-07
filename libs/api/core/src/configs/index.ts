import { CORE_CONFIG_TOKEN, DEFAULT_CORE_CONFIG } from '../configs/core.config';
// import { DEFAULT_APP_CONFIG } from '../configs/app.config';
import { appConfig } from  '@xapp/shared/config';

export const CORE_CONFIGS = [
	{
		provide: CORE_CONFIG_TOKEN,
		useValue: DEFAULT_CORE_CONFIG,
	},
];

export { appConfig as DEFAULT_APP_CONFIG };
