import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		title: schemas.longString,
	},
	type: 'object',
	required: ['title'],
	description: 'A todo object',
};
