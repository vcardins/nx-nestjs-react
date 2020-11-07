export const OAuthConfig = () => ({
	/*
	|--------------------------------------------------------------------------
	| OAuth Configurations
	|--------------------------------------------------------------------------
	|
	| In our case we decided to use the GMail SMTP Server. Just add your credentials
	| below or in the .env file.
	|
	*/

	facebook: {
		clientId: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		redirectUri: process.env.FACEBOOK_OAUTH_REDIRECT_URI,
	},
	google: {
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
	},
	twitter: {
		clientId: process.env.TWITTER_CLIENT_ID,
		clientSecret: process.env.TWITTER_CLIENT_SECRET,
		redirectUri: process.env.TWITTER_OAUTH_REDIRECT_URI,
	},
	microsoft: {
		clientId: process.env.MICROSOFT_CLIENT_ID,
		clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
		redirectUri: process.env.MICROSOFT_OAUTH_REDIRECT_URI,
	},
	linkedIn: {
		clientId: process.env.LINKED_IN_CLIENT_ID,
		clientSecret: process.env.LINKED_IN_CLIENT_SECRET,
		redirectUri: process.env.LINKED_IN_OAUTH_REDIRECT_URI,
	},
	github: {
		clientId: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		redirectUri: process.env.GITHUB_OAUTH_REDIRECT_URI,
	},
});
