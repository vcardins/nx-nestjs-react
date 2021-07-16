// import { JSONSchemaType } from 'ajv';
// import { HouseholdRoomInput } from '@xapp/shared/types';

export const validationSchema/*: JSONSchemaType<HouseholdRoomInput>*/ = {
	properties: {
		templateId: {
			type: 'integer',
		},
		frequencyId: {
			type: 'integer',
		},
		name: {
			maxLength: 60,
			type: 'string',
			minLength: 1,
		},
		estimatedCompletionTime: {
			type: 'integer',
		},
		notes: {
			maxLength: 255,
			type: 'string',
			minLength: 1,
		},
		assignedUserId: {
			type: 'integer',
		},
	},
	type: 'object',
	required: ['frequencyId', 'estimatedCompletionTime'],
	description: 'A household room object',
};
