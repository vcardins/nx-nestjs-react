import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		email: schemas.email,
		firstName: {
			maxLength: 60,
			type: 'string',
			minLength: 1,
		},
		householdId: schemas.id,
		roomTypeId: schemas.id,
	},
	type: 'object',
	required: ['email', 'firstName'],
	description: 'A household room object',
};
