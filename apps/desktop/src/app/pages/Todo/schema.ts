export const validationSchema = {
	properties: {
		title: {
			maxLength: 254,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: [
		'title',
	],
	description: 'A todo object',
};
