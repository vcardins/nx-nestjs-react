import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		name: schemas.mediumString,
		estimatedCompletionTime: schemas.id,
		templateId:  schemas.id,
		frequencyId: schemas.id,
		householdRoomId: schemas.id,
		assignedUserId: schemas.id,

	},
	type: 'object',
	required: ['householdRoomId', 'frequencyId', 'estimatedCompletionTime', 'assignedUserId'],
	description: 'A task object',
};
