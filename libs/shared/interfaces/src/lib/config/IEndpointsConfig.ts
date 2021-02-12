export interface IEndpointsConfig {
	signUp: string;
	signIn: string;
	providerUri: string;
	verifyEmail: string;
	verifyPhoneNumber: string;
	providerSignin: string;
	resetPassword: string;
	changePassword: string;
	forgotPassword: string;
	closeAccount: string;
	reopenAccount: string;
	changePhoneNumber?: string;
	profile: string;
	updateProfile: string;
}
