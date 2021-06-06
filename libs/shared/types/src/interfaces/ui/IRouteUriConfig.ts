export interface IOAuthProviderUri {
	uri: string;
	signin: string;
	token: string;
}

export interface IRouteUriConfig {
	home: string;
	signIn: string;
	signOut: string;
	signUp: string;
	oauthProviderUri: IOAuthProviderUri;
	forgotPassword: string;
	verifyAccount: string;
	resetPassword: string;
	changePassword: string;
	updateProfile: string;
	userProfile: string;
	notFound: string;
	systemError: string;
}
