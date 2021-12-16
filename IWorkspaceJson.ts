interface Cli {
	defaultCollection: string;
}


interface FileReplacement {
	replace: string;
	with: string;
}


interface Budget {
	type: string;
	maximumWarning: string;
	maximumError: string;
}


interface Production {
	fileReplacements: FileReplacement[];
	optimization: boolean;
	outputHashing: string;
	sourceMap: boolean;
	extractCss: boolean;
	namedChunks: boolean;
	extractLicenses: boolean;
	vendorChunk: boolean;
	budgets: Budget[];
}

interface Options {
	outputPath?: string;
	index?: string;
	main?: string;
	polyfills?: string;
	tsConfig?: string;
	assets?: string[];
	styles?: string[];
	scripts?: string[];
	webpackConfig?: string;
	proxyConfig?: string;
	buildTarget?: string;
}


interface Configurations {
	production: Production;
}

interface Library {
	style: string;
	linter: string;
}

interface Component {
	style: string;
}

interface Application {
	style: string;
	linter: string;
	babel: boolean;
}

interface E2e {
	builder: string;
	options: Options;
	configurations: Configurations;
}

interface Test {
	builder: string;
	options: Options;
}

interface Lint {
	builder: string;
	options: Options;
}

interface Serve {
	builder: string;
	options: Options;
	configurations: Configurations;
}

interface Build {
	builder: string;
	options: Options;
	configurations: Configurations;
}

interface Architect {
	build: Build;
	serve: Serve;
	lint: Lint;
	test: Test;
}

interface Schematic {
	application: Application;
	component: Component;
	library: Library;
}


interface Schematics {
	[key: string]: Schematic;
}

interface Project {
	root: string;
	sourceRoot: string;
	projectType: string;
	prefix?: string;
	schematics?: Schematics;
	architect: Architect;
}

export interface IWorkspaceJson {
	version: number;
	projects: { [key: string]: Project };
	cli: Cli;
	schematics: Schematics;
	defaultProject: string;
}
