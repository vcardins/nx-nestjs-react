import { MaxLength, IsOptional/*, Matches*/ } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IUserProfileInput } from '@xapp/shared/types';

@JSONSchema({
	description: 'A user signup object',
	example: { id: '123' },
})
export class UserProfileInput implements IUserProfileInput {
	@MaxLength(30)
	@IsOptional()
	firstName?: string = undefined;

	@MaxLength(30)
	@IsOptional()
	lastName?: string = undefined;

	@MaxLength(12)
	@IsOptional()
	phoneNumber?: string;

	@MaxLength(12)
	@IsOptional()
	displayName?: string;

	@MaxLength(400)
	@IsOptional()
	bio?: string;

	@MaxLength(12)
	@IsOptional()
	dateOfBirth?: string;

	@IsOptional()
	pictureUrl?: string;
	locale?: string;
}
