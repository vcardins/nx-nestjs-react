import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength /* Matches*/ } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IResetPasswordInput } from '@xapp/shared/interfaces';
import { Match } from '@xapp/api/core';

import { BasePasswordInput } from './base-password.input';

@JSONSchema({
	description: 'A reset password object',
})
export class ResetPasswordInput extends BasePasswordInput implements IResetPasswordInput {
	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	verificationKey: string;

	@MaxLength(128)
	@ApiProperty()
	@Match('oldPassword', {message: 'password and confirm password don\'t match'} )
	confirmPassword: string;
}
