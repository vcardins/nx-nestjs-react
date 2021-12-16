import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	properties: {
		code: schemas.code,
	},
	type: 'object',
	required: ['code'],
	description: 'A phone verification',
};
