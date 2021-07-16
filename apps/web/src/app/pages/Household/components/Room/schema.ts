// import { JSONSchemaType } from 'ajv';
// import { HouseholdRoomInput } from '@xapp/shared/types';

export const validationSchema/*: JSONSchemaType<HouseholdRoomInput>*/ = {
	properties: {
		householdId: {
			type: 'integer',
		},
		roomTypeId: {
			type: 'integer',
		},
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
