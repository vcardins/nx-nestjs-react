export const validationSchema = {
	properties: {
		verificationKey: {
			maxLength: 128,
			type: 'string',
			minLength: 1,
		},
		confirmPassword: {
			type: 'string',
			maxLength: 128,
		},
		password: {
			maxLength: 128,
			type: 'string',
			minLength: 1,
		},
	},
	type: 'object',
	required: [
		'verificationKey',
		'confirmPassword',
		'password',
	],
	description: 'A reset password object',
};
