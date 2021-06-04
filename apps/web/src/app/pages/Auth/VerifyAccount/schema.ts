export const validationSchema = {
	properties: {
		code: {
			maxLength: 10,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: ['code'],
	description: 'A phone verification',
};
