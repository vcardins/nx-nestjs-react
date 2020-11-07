export const validationSchema = {
	properties: {
		oldPassword: {
			maxLength: 128,
			type: 'string',
			minLength: 1,
		},
		newPassword: {
			type: 'string',
			maxLength: 128,
		},
	},
	type: 'object',
	required: [
		'oldPassword',
		'newPassword',
	],
	description: 'A change password object',
};
