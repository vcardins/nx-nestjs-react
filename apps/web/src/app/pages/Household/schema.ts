import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		name: schemas.mediumString,
	},
	type: 'object',
	required: ['name'],
	description: 'A houselhold object',
};
