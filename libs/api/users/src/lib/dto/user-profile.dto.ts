import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

import { IUserProfile } from '@xapp/shared/interfaces';

export class UserProfileDto implements IUserProfile {
	@ApiProperty()
	pictureUrl: string | null;

	@ApiProperty()
	bio: string | null;

	@ApiProperty()
	@MaxLength(30)
	firstName: string = undefined;

	@ApiProperty()
	@MaxLength(30)
	lastName: string = undefined;

	@ApiProperty()
	dateOfBirth: string | null;

	@ApiProperty()
	locale: string | null;

	@ApiProperty()
	mobile: string | null;

	@ApiProperty()
	get displayName () {
		return `${this.firstName} ${this.lastName}`;
	}
}
