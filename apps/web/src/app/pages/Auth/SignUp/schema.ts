import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		email: schemas.email,
		password: schemas.password,
		confirmPassword: schemas.password,
		firstName: schemas.shortString,
		lastName: schemas.shortString,
	},
	type: 'object',
	required: ['email', 'password', 'confirmPassword'],
	description: 'A user signup object',
};
