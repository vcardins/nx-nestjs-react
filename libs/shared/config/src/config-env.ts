import { writeFile } from 'fs';

const environment = process.env.NODE_ENV;
let apiURL: string;
if (environment === 'production') {
	apiURL = process.env.PRODUCTION_API_ENDPOINT;
}
else if (environment === 'test') {
	apiURL = process.env.TEST_API_ENDPOINT;
}

const targetPath = './src/environments/environment.prod.ts';
const envConfigFile = `export const environment = {
	production: true,
	apiUrl: '${apiURL}'};
`;

writeFile(targetPath, envConfigFile, (err: any) => {
	if (err) {
		throw new Error(err);
	}
});
