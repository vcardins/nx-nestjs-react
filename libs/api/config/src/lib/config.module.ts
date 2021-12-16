import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { MailConfig } from './mail.config';
import { OAuthConfig } from './oath.config';
import { DatabaseConfig } from './database.config';
import { ApiConfig } from './api.config';
import { GraphqlConfig } from './graphql.config';

@Global()
@Module({
	imports: [
		NestConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
			load: [
				() => ({ api: ApiConfig() }),
				() => ({ app: AppConfig() }),
				() => ({ database: DatabaseConfig() }),
				() => ({ graphql: GraphqlConfig() }),
				() => ({ mail: MailConfig() }),
				() => ({ oauth: OAuthConfig() }),
			],
		}),
	],
})
export class ConfigModule {}
