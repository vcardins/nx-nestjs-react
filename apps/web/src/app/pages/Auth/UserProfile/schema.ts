export const validationSchema = {
	type: 'object',
	properties: {
		firstName: { type: 'string' },
		lastName: { type: 'string' },
		phoneNumber: { type: 'string' }, // , format: 'phone-us'
		avatar: { type: 'string' },
		// twitterId: { type: 'string' },
		// facebookId: { type: 'string' },
		bio: { type: 'string' },
		// iso2: { type: 'string' },
	},
	required: ['firstName', 'lastName'],
};
