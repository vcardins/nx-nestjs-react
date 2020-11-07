/* eslint-disable camelcase */
import { Logger } from '@nestjs/common';
import { config as load } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import {
	AUTH_APP_FILTERS,
	AUTH_APP_GUARDS,
	AUTH_PASSPORT_STRATEGIES,
	DEFAULT_FACEBOOK_CONFIG,
	DEFAULT_GOOGLE_CONFIG,
	DEFAULT_JWT_CONFIG,
	FACEBOOK_CONFIG_TOKEN,
	GOOGLE_CONFIG_TOKEN,
	JWT_CONFIG_TOKEN,
} from '@xapp/api/auth';

import {
	CORE_APP_FILTERS,
	CORE_APP_PIPES,
	CORE_CONFIG_TOKEN,
	DEFAULT_CORE_CONFIG,
	ICoreConfig,
	IRestApiConfig,
} from '@xapp/api/core';

import { DatabaseConfig } from './database.config';
import { AppConfig } from './app.config';
import { OAuthConfig } from './oath.config';

const dbConfig = DatabaseConfig();
const appConfig = AppConfig();
const oauthConfig = OAuthConfig();

const envName = process.env.NODE_ENV || 'development';
let envFile = '';

try {
	envFile = resolveRootFile(`.env.${envName}`);
	fs.accessSync(envFile);
	load({ path: envFile });
	Logger.log(`env file: ${envFile}`, 'Main');
}
catch (error) {
	Logger.log(`error on get env file: ${envFile}`, 'Main');
	try {
		fs.accessSync(resolveRootFile('.env'));
		load();
		Logger.log('env file: .env', 'Main');
	}
	catch (error) {
		Logger.log('error on get env file: .env', 'Main');
	}
}

export const ApiConfig = (): IRestApiConfig => ({
	env: {
		name: envName,
		port: appConfig.port,
		domain: appConfig.domain,
		protocol: appConfig.protocol,
	},
	basePath: appConfig.basePath,
	project: {
		path: getRootPath(),
		tsconfig: loadRootJson('tsconfig.json'),
		package: loadRootJson('package.json'),
		staticFolders: [resolveRootFile('client')],
	},
	db: {
		file: dbConfig.database,
	},
	core: {
		providers: () => [
			{
				provide: CORE_CONFIG_TOKEN,
				useValue: {
					...DEFAULT_CORE_CONFIG,
					port: appConfig.port,
					protocol: appConfig.protocol,
					domain: appConfig.domain,
					encryptionKey: appConfig.clientSecret,
				} as ICoreConfig,
			},
			...CORE_APP_FILTERS,
			...CORE_APP_PIPES,
		],
	},
	auth: {
		providers: () => [
			{
				provide: JWT_CONFIG_TOKEN,
				useValue: {
					...DEFAULT_JWT_CONFIG,
					authHeaderPrefix: appConfig.jwtAuthHeaderPrefix,
					expirationDelta: appConfig.jwtExpirationDelta,
					secretKey: appConfig.jwtSecretKey,
				},
			},
			{
				provide: FACEBOOK_CONFIG_TOKEN,
				useValue: {
					...DEFAULT_FACEBOOK_CONFIG,
					clientID: oauthConfig.facebook.clientId,
					clientSecret: oauthConfig.facebook.clientSecret,
					oauthRedirectUri: oauthConfig.facebook.redirectUri,
				},
			},
			{
				provide: GOOGLE_CONFIG_TOKEN,
				useValue: {
					...DEFAULT_GOOGLE_CONFIG,
					clientID: oauthConfig.google.clientId,
					clientSecret: oauthConfig.google.clientSecret,
					oauthRedirectUri: oauthConfig.google.redirectUri,
				},
			},
			...AUTH_APP_GUARDS,
			...AUTH_APP_FILTERS,
		],
		passportProviders: () => AUTH_PASSPORT_STRATEGIES,
	},
});

export function getRootPath() {
	return envName === 'development' ? '../../../' : '../../';
}
export function resolveRootFile(fileName: string) {
	return path.resolve(__dirname, getRootPath(), fileName);
}

export function loadRootJson<T = any>(fileName: string) {
	const file = resolveRootFile(fileName);
	const json = fs.readFileSync(file).toString();

	return JSON.parse(json) as T;
}

const apiConfig = ApiConfig();

export { apiConfig }
