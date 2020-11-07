import { Provider } from '@nestjs/common';

export interface IRestApiConfig {
	env: {
		name: string;
		port: number;
		domain: string;
		protocol: 'http' | 'https';
	};
	basePath: string;

	project: {
		path: string;
		tsconfig: {
			compilerOptions: { paths: { [key: string]: string[] } };
		};
		package: any;
		staticFolders: string[];
	};
	db: {
		file: string;
	};
	core: {
		providers: () => Provider[];
	};
	auth: {
		providers: () => Provider[];
		passportProviders: () => Provider[];
	};
}
