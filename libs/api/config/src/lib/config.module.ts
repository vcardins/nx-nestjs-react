import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { MailConfig } from './mail.config';
import { OAuthConfig } from './oath.config';
import { DatabaseConfig } from './database.config';
import { ApiConfig } from './api.config';

@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
			load: [
				() => ({ app: AppConfig() }),
				() => ({ mail: MailConfig() }),
				() => ({ oauth: OAuthConfig() }),
				() => ({ database: DatabaseConfig() }),
				() => ({ api: ApiConfig() }),
			],
		}),
	],
})
export class ConfigModule {}
