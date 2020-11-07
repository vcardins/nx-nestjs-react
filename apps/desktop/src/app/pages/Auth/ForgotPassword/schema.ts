export const validationSchema = {
	properties: {
		email: {
			maxLength: 254,
			type: 'string',
			format: 'email',
			minLength: 1,
		},
	},
	type: 'object',
	required: [
		'email',
	],
	description: 'A forgot password object',
};
