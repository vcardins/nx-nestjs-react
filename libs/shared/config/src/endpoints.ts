import { IEndpointsConfig } from '@xapp/shared/types';

export const endpoints: IEndpointsConfig = {
	signIn: 'auth/signin',
	providerUri: 'auth/{provider}/uri',
	providerSignin: 'auth/{provider}/signin',
	profile: 'info',
	signUp: 'account/signup',
	verifyEmail: 'verify/email',
	verifyPhoneNumber: 'verify/phone',
	closeAccount: 'close',
	reopenAccount: 'reopen',
	resetPassword: 'reset-password',
	forgotPassword: 'forgot-password',
	changePassword: 'change-password',
	updateProfile: 'profile',
	// changePhoneNumber: 'account/change-phone-number',
};
