import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		email: schemas.email,
		password: schemas.password,
	},
	type: 'object',
	required: ['email', 'password'],
	description: 'A user signup object',
};
