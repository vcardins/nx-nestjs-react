import '@babel/polyfill';
import { NodePlopAPI, ActionType } from 'plop';
import { yellow, red } from 'chalk';

import { findFiles, prettierFormatter } from './formatter';
import { dirType, getExt } from './helpers';
import { prompts, ModuleType } from './prompts';
import { getActions } from './actions';

import path from 'path';
import camelcase from 'camelcase';

module.exports = function (plop: NodePlopAPI) {
	// helpers
	plop.setHelper('lower', (txt) => txt.toLowerCase());
	plop.setHelper('camelcase', (name) =>
		camelcase(name, {
			pascalCase: true,
			// preserveConsecutiveUppercase: true,
		})
	);

	plop.setGenerator('component', {
		description: 'default generator',
		prompts: prompts as any,
		// Actions
		actions: (props): ActionType[] => {
			const { type } = props;
			const dir = dirType(type === ModuleType.Component);
			const ext = getExt(true);
			const webOutTarget = `${path.join(process.cwd(), 'apps/web/src/app')}/${dir}`;
			const apiOutTarget = `${path.join(process.cwd(), 'apps/api/src/app')}/${dir}`;

			const actions = getActions(props);


			if (!actions.length) {
				red(`>>>>>>>>>>>>>>>>>>> No actions available <<<<<<<<<<<<<<<<<<<`);
			}

			actions.push(() => {
				const files = findFiles(webOutTarget);
				for (let file of files) {
					actions.push(async () => await prettierFormatter(file));
				}
				yellow(`>>>>>>>>>>>>>>>>>>> ${files.length} Found to format <<<<<<<<<<<<<<<<<<<`);
			});

			return actions;
		},
	});
};
