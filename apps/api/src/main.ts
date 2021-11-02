/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { register } from 'tsconfig-paths';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { apiConfig } from '@xapp/api/config';
import { AppModule } from './app/app.module';

async function bootstrap() {
	if (apiConfig.env.name !== 'development') {
		register({
			baseUrl: apiConfig.project.path,
			paths: apiConfig.project.tsconfig.compilerOptions.paths,
		});
	}

	const appOptions = { cors: true };
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule.forRoot({
			providers: [
				...apiConfig.core.providers(),
				...apiConfig.auth.providers(),
			],
			passportProviders: apiConfig.auth.passportProviders(),
		}),
		appOptions,
	);

	app.setGlobalPrefix(apiConfig.basePath);

	app.useWebSocketAdapter(new IoAdapter(app));

	apiConfig.project.staticFolders.forEach((folder) => {
		app.useStaticAssets(folder);
	});

	const documentBuilder = new DocumentBuilder()
		.setTitle(apiConfig.project.package.name)
		.setDescription(apiConfig.project.package.description)
		.setExternalDoc('Project on Github', apiConfig.project.package.homepage)
		.setLicense(apiConfig.project.package.license, '')
		.setVersion(apiConfig.project.package.version)
		.addBearerAuth({
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		}, 'access-token'); // 'Authorization', 'header'

	// documentBuilder = documentBuilder.addSecurity(
	// 	apiConfig.env.protocol === 'https' ? 'https' : 'http',
	// 	apiConfig.env.protocol === 'https' ? 'http' : 'https'
	// );

	SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, documentBuilder.build()));

	await app.listen(apiConfig.env.port, () => {
		Logger.log(`** Nest Live Development Server is listening on //${apiConfig.env.domain}:${apiConfig.env.port} **`);
	});
}

bootstrap();
