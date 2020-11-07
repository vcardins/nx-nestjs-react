import * as packageJson from '../../../../../package.json';
const { name, title, description, version} = packageJson;

export const AppConfig = () => {
	const {
		NODE_ENV, PROTOCOL, DOMAIN, PORT, BASE_PATH,
		CODE, CLIENT_ID, CLIENT_SECRET, GOOGLE_ANALYTICS_ID,
		JWT_SECRET_KEY, JWT_EXPIRATION_DELTA, JWT_AUTH_HEADER_PREFIX,
	} = process.env;

	return {
		/*
		|--------------------------------------------------------------------------
		| Application Meta Data
		|--------------------------------------------------------------------------
		|
		| This values are defined in the package.json.
		|
		*/
		env: NODE_ENV,
		code: CODE,
		name,
		title,
		description,
		version,

		/*
		|--------------------------------------------------------------------------
		| Application Port
		|--------------------------------------------------------------------------
		|
		| This value define on witch port the application is available. Default is
		| the standard port 8080
		|
		*/
		domain: DOMAIN,
		port: PORT ? parseInt(PORT, 10) : 5000,
		protocol: (PROTOCOL === 'https' ? 'https' : 'http') as 'https' | 'http',

		basePath: BASE_PATH,
		/*
		|--------------------------------------------------------------------------
		| API URL
		|--------------------------------------------------------------------------
		|
		| This value defines the url to our web client.
		|
		*/
		apiUrl: `http://${DOMAIN}:${PORT}${BASE_PATH}`,
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		analyticsId: GOOGLE_ANALYTICS_ID,
		jwtSecretKey: JWT_SECRET_KEY,
		jwtExpirationDelta: JWT_EXPIRATION_DELTA,
		jwtAuthHeaderPrefix: JWT_AUTH_HEADER_PREFIX,
	}
};
