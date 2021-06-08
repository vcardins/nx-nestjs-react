import { ConnectionString } from 'connection-string';

const connectionString = new ConnectionString(process.env.DATABASE_URL || 'sqlite://db/local.db');
const logging = (process.env.DATABASE_LOGGING || '').split(',');

export const DatabaseConfig = () => {
	const type = connectionString.protocol;
	const database = connectionString.protocol === 'sqlite'
		? `${connectionString.hosts?.[0]?.name ?? '' }/${ connectionString.path?.[0] ?? '' }`
		: connectionString.path?.[0];

	return {
		/*
		|--------------------------------------------------------------------------
		| Mail Configurations
		|--------------------------------------------------------------------------
		|
		| In our case we decided to use the GMail SMTP Server. Just add your credentials
		| below or in the .env file.
		|
		*/
		type,
		logging,
		synchronize: process.env.DB_SYNCHRONIZE === 'true',
		dropSchema: process.env.DB_DROP_SCHEMA === 'true',
		migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
		host: connectionString.hosts?.[0].name,
		port: +(connectionString.hosts?.[0].port || ''),
		username: connectionString.user,
		password: connectionString.password,
		database,
	}
};
