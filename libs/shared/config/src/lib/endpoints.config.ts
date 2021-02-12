import { IEndpointsConfig } from '@xapp/shared/interfaces';

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
	updateProfile: 'account/profile',
	// changePhoneNumber: 'account/change-phone-number',
};
