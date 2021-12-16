import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		verificationKey: schemas.longString,
		confirmPassword: schemas.password,
		password: schemas.password,
	},
	type: 'object',
	required: ['verificationKey', 'confirmPassword', 'password'],
	description: 'A reset password object',
};
