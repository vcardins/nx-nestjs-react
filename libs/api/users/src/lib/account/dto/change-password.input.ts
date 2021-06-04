import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength /* Matches*/ } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IChangePasswordInput } from '@xapp/shared/auth';
import { Unmatch } from '@xapp/api/core';

@JSONSchema({
	description: 'A change password object',
})
export class ChangePasswordInput implements IChangePasswordInput {
	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	// @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
	oldPassword: string;

	@MaxLength(128)
	@ApiProperty()
	@Unmatch('oldPassword', { message: 'password and confirm password don\'t match' } )
	newPassword: string;
}
