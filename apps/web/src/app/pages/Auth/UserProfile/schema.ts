import { schemas, JSONSchema7Extended } from '@xapp/shared/config';

export const validationSchema: JSONSchema7Extended = {
	type: 'object',
	properties: {
		firstName: schemas.shortString,
		lastName: schemas.shortString,
		phoneNumber: schemas.phone,
		avatar: { type: 'string' },
		// twitterId: { type: 'string' },
		// facebookId: { type: 'string' },
		bio: schemas.text,
		// iso2: { type: 'string' },
	},
	required: ['firstName', 'lastName'],
};
