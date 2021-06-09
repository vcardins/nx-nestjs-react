import { IAppConfig, IRouteUriConfig, Themes } from '@xapp/shared/types';
import { endpoints } from './endpoints';
import { apiMeta } from './apiMeta';

import { name, title, description, version } from '../../../../package.json';

const routeUriConfig: IRouteUriConfig = {
	home: '/',
	signIn: '/signin',
	signOut: '/signout',
	signUp: '/signup',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	changePassword: '/change-password',
	changePhoneNumber: '/change-password',
	verifyAccount: '/verify',
	updateProfile: '/update',
	userProfile: '/user-profile',
	notFound: '/error/404',
	systemError: '/error/500',
	oauthProviderUri: {
		uri: '{provider}/uri',
		signin: '{provider}/signin',
		token: '{provider}/token',
	},
};

const AppConfig = (): IAppConfig => ({
	code: process.env.CODE,
	name,
	title,
	theme: Themes.Light,
	description,
	version,
	analyticsId: process.env.GOOGLE_ANALYTICS_ID,
	routes: routeUriConfig,
	apiMeta,
	endpoints,
});

export const appConfig = AppConfig();
