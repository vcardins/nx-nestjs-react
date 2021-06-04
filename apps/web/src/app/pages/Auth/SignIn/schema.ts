export const validationSchema = {
	properties: {
		email: {
			maxLength: 150,
			type: 'string',
			format: 'email',
			minLength: 1,
		},
		password: {
			maxLength: 128,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: ['email', 'password'],
	description: 'A user signup object',
	example: {
		id: '123',
	},
};
