import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		templateId: schemas.id,
		frequencyId: schemas.id,
		name: schemas.mediumString,
		estimatedCompletionTime: schemas.id,
		notes: schemas.text,
		assignedUserId: schemas.id,
	},
	type: 'object',
	required: ['frequencyId', 'estimatedCompletionTime'],
	description: 'A household room object',
};
