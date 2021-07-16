// import { JSONSchemaType } from 'ajv';
// import { HouseholdRoomInput } from '@xapp/shared/types';

export const validationSchema/*: JSONSchemaType<HouseholdRoomInput>*/ = {
	properties: {
		email: {
			maxLength: 255,
			type: 'string',
			minLength: 1,
		},
		firstName: {
			maxLength: 60,
			type: 'string',
			minLength: 1,
		},
		householdId: {
			type: 'integer',
		},
		roomTypeId: {
			type: 'integer',
		},
	},
	type: 'object',
	required: ['email', 'firstName'],
	description: 'A household room object',
};
