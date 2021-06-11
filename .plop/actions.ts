import { ActionConfig, ActionType } from 'plop';
import { Actions } from 'node-plop';
import path from 'path';

import { prompts, ModuleType } from './prompts';
import { existsSync } from 'fs';
import { yellow, red } from 'chalk';

import { getTemplate, dirType, getTestTemplate, getExt, getContainerTemplate, isReactNative, getTemplateFolder } from './helpers';


export const getActions = (props: any) => {
	const { type, options, name, containerOptions } = props;
	const actions: ActionType[] | any = [];
	const dir = dirType(type === ModuleType.Component);
	const ext = getExt(true);
	const webOutTarget = `${path.join(process.cwd(), 'apps/web/src/app')}/${dir}`;
	const apiOutTarget = `${path.join(process.cwd(), 'apps/api/src/app')}/${dir}`;

	switch (type) {
		case ModuleType.Container:
			/************ CONTAINERS *************/
			actions.push({
				type: 'add',
				path: `${webOutTarget}/{{camelcase name}}.${ext}`,
				templateFile: getContainerTemplate(),
				data: {
					state: containerOptions.includes('state'),
					redux: containerOptions.includes('zustand'),
				},
			});
			break;
		case ModuleType.Component:
			actions.push({
				type: 'add',
				path: `${webOutTarget}/{{camelcase name}}/index.${ext}`,
				templateFile: getTemplate(),
				data: {
					test: true && options.includes('test'),
					css: options.includes('css') && !options.includes('scss') && !isReactNative,
				},
			});

			if (options.includes('append')) {
				actions.push({
					// type: 'append',
					type: existsSync(`${webOutTarget}/index.${true ? 'ts' : 'js'}`) ? 'append' : 'add',
					path: `${webOutTarget}/index.${true ? 'ts' : 'js'}`,
					template: `export { default as {{camelcase name}} } from './{{camelcase name}}'`,
					abortOnFail: false,
					unique: true,
					skip: () => type === ModuleType.Container,
				});
			}

			if (options.includes('test')) {
				actions.push({
					type: 'add',
					path: `${webOutTarget}/{{camelcase name}}/{{camelcase name}}.spec.${getExt(true)}`,
					templateFile: getTestTemplate(true),
					skip: () => type === ModuleType.Container,
				});
			}

			if (!isReactNative) {
				let value = options.includes('css') ? 'css' : 'scss';
				if (value === 'css') {
					actions.push({
						type: 'add',
						path: `${webOutTarget}/{{camelcase name}}/${name.toLowerCase()}.module.css`,
						templateFile: `${getTemplateFolder('web')}/style.module.hbs`,
						skip: () => type === ModuleType.Container && isReactNative,
					});
				} else {
					actions.push({
						type: 'add',
						path: `${webOutTarget}/{{camelcase name}}/${name.toLowerCase()}.module.scss`,
						templateFile: `${getTemplateFolder('web')}/style.module.hbs`,
						skip: () => type === ModuleType.Container && isReactNative,
					});
				}
			}

			if (options.includes('readme')) {
				actions.push({
					type: 'add',
					path: `${webOutTarget}/{{camelcase name}}/Readme.md`,
					templateFile: `${getTemplateFolder('web')}/readme.md.hbs`,
					skip: () => type === ModuleType.Container,
				});
			}

			if (options.includes('story')) {
				actions.push({
					type: 'add',
					path: `${webOutTarget}/{{camelcase name}}/{{camelcase name}}.stories.${getExt(true)}`,
					templateFile: `${getTemplateFolder('web')}/stories.${getExt(true)}.hbs`,
					skip: () => type === ModuleType.Container,
					data: {
						ext: getExt(true),
					},
				});
			}
			break;
		case ModuleType.Solution:
			break;
		case ModuleType.Module:
			break;
	}

	return actions;
}
