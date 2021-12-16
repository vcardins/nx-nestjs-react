import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		householdId: schemas.id,
		roomTypeId: schemas.id,
		customName: {
			maxLength: 60,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: ['householdId', 'roomTypeId'],
	description: 'A household room object',
};
