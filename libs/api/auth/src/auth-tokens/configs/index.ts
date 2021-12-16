import { DEFAULT_FACEBOOK_CONFIG, FACEBOOK_CONFIG_TOKEN } from '../configs/facebook.config';
import { DEFAULT_GOOGLE_CONFIG, GOOGLE_CONFIG_TOKEN } from '../configs/google.config';
import { DEFAULT_JWT_CONFIG, JWT_CONFIG_TOKEN } from '../configs/jwt.config';

export const AUTH_CONFIGS = [
	{
		provide: JWT_CONFIG_TOKEN,
		useValue: DEFAULT_JWT_CONFIG,
	},
	{
		provide: FACEBOOK_CONFIG_TOKEN,
		useValue: DEFAULT_FACEBOOK_CONFIG,
	},
	{
		provide: GOOGLE_CONFIG_TOKEN,
		useValue: DEFAULT_GOOGLE_CONFIG,
	},
];
