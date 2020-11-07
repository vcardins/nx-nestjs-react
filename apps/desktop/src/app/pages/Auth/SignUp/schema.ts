export const validationSchema = {
	properties: {
		email: {
			maxLength: 254,
			type: 'string',
			format: 'email',
			minLength: 1,
		},
		username: {
			maxLength: 150,
			type: 'string',
			minLength: 1,
		},
		password: {
			maxLength: 128,
			type: 'string',
			minLength: 1,
		},
		confirmPassword: {
			type: 'string',
			maxLength: 128,
			minLength: 1,
		},
		firstName: {
			maxLength: 30,
			type: 'string',
		},
		lastName: {
			maxLength: 30,
			type: 'string',
		},
	},
	type: 'object',
	required: ['email', 'username', 'password', 'confirmPassword'],
	description: 'A user signup object',
};
