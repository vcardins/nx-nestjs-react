import { existsSync } from 'fs';
import path from 'path';

export const getTemplateFolder = (subFolder?: string) => `${__dirname}/templates${subFolder ? `/${subFolder}` : ''}`

export const getExt = (isReact: boolean) => isReact ? 'tsx' : 'ts';

export const isReactNative = existsSync(`${path.join(process.cwd(), 'ios')}`);
const getProjectTemplateDir = isReactNative ? 'app' : 'web';

export function dirType(type: boolean): string {
	return type ? 'components' : 'containers';
}

export function getTemplate(): string {
	return `${getTemplateFolder()}/${getProjectTemplateDir}/component.${getExt(true)}.function.hbs`;
}

export function getTestTemplate(isReact: boolean): string {
	return `${getTemplateFolder()}/test.${getExt(isReact)}.hbs`;
}

export function getContainerTemplate(): string {
	return `${getTemplateFolder()}/${getProjectTemplateDir}/container.${getExt(true)}.function.hbs`;
}
