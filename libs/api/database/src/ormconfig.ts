import * as fs from 'fs';
import { ConnectionString } from 'connection-string';
import { config as load } from 'dotenv';
import { ConnectionOptions } from 'typeorm-seeding';
import { DatabaseType } from 'typeorm';

import * as workspaceJson from '../../../../workspace.json';
import { IWorkspaceJson } from '../../../../IWorkspaceJson';

const basePath = '../../../../';
const isFromMigration = process.env.MIGRATIONS === 'true';
const envName = process.env.NODE_ENV || 'development';
const isDevelop = envName === 'development';
const sourceRootKey = isDevelop ? 'root' : 'outputPath';
const filesExt = isFromMigration ? '.ts' : '{.ts}';
const envFile = `.env${envName ? '.' : ''}${envName}`;
const envFilePath = `${basePath}${envFile}`;

const { projects, defaultProject } = (workspaceJson as unknown) as IWorkspaceJson;

try {
	fs.accessSync(envFilePath);
	load({ path: envFilePath });
	// console.log(`env file: ${envFile}`);
}
catch (error) {
	// console.log(`error on get env file: ${envFile}`);
	try {
		fs.accessSync('.env');
		load();
		// console.log('env file: .env');
	}
	catch (e) {
		// console.log('error on get env file: .env');
	}
}

// function normalizationFileList(files: string[]) {
// 	const newFiles: string[] = [];
// 	for (let i = 0; i < files.length; i++) {
// 		if (files[i].indexOf('.d.ts') === -1) {
// 			let founded = false;
// 			for (let j = 0; j < newFiles.length; j++) {
// 				const filename = newFiles[j];
// 				if (
// 					path.basename(filename, path.parse(filename).ext) ===
// 					path.basename(files[i], path.parse(files[i]).ext)
// 				) {
// 					founded = true;
// 				}
// 			}
// 			if (!founded) {
// 				newFiles.push(files[i]);
// 			}
// 		}
// 	}
// 	return newFiles;
// }

function filterProjects(projectKey: string) {
	const lib = projects[projectKey];

	return (
		(
			isDevelop
			|| lib[sourceRootKey] !== undefined
			|| lib?.architect?.build?.options?.[sourceRootKey] !== undefined
		) && projectKey.indexOf('api') > -1 // filter by api libraries/applications only
	);
}

function getProjectsByType(type: string) {
	return Object.keys(projects)
		.filter((key) => projects[key].projectType === type && projects[key].root.indexOf('e2e') === -1)  // ignore test projects
		.filter(filterProjects)
		.map((key) => projects[key]);
}

const libs = getProjectsByType('library');
const apps = getProjectsByType('application');

const getFilesByFolder = (folder: string) => libs.concat(apps).map((lib) =>
	`${lib[sourceRootKey] || lib.architect.build.options[sourceRootKey]}${folder}${filesExt}`,
);

const defaultApp = projects[defaultProject];

const entities = getFilesByFolder(`${isFromMigration ? '/**' : ''}/**/*.entity`);

const connectionString = new ConnectionString(process.env.DATABASE_URL || 'sqlite://database/sqlitedb.db');

const [migrations, subscribers, seeds] = ['migrations', 'subscribers', 'seeds'].map((folder) =>
	getFilesByFolder(`/**/${folder}/**/*`),
);

const type = connectionString.protocol as DatabaseType;
const baseOrmConfig: Partial<ConnectionOptions> = {
	logging: ['error', 'warn', 'migration'],
	synchronize: false,
	entities,
	migrations,
	subscribers,
	seeds,

	cli: {
		migrationsDir: `${defaultApp[sourceRootKey]}/src/migrations`,
		subscribersDir: `${defaultApp[sourceRootKey]}/src/subscribers`,
	},
};

// @ts-ignore
const ormConfig: Partial<ConnectionOptions> = connectionString.protocol === 'sqlite'
	? {
		type,
		database: `${connectionString.hosts?.[0]?.name ?? '' }/${ connectionString.path?.[0] ?? '' }` as DatabaseType,
		...baseOrmConfig,
	}
	: {
		host: connectionString.hosts?.[0].name,
		port: +connectionString.hosts?.[0].port,
		username: connectionString.user,
		password: connectionString.password,
		database: connectionString.path?.[0] as DatabaseType,
		...baseOrmConfig,
	};

export = ormConfig;
