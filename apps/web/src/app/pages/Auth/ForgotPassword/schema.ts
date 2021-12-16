import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		email: schemas.email,
	},
	type: 'object',
	required: ['email'],
	description: 'A forgot password object',
};
