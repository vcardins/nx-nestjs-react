export const validationSchema = {
	properties: {
		name: {
			maxLength: 254,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: ['name'],
	description: 'A houselhold object',
};
