import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		oldPassword: schemas.password,
		newPassword: schemas.password,
	},
	type: 'object',
	required: ['oldPassword', 'newPassword'],
	description: 'A change password object',
};
