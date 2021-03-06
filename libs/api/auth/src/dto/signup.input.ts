import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, IsOptional/*, Matches*/ } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { ISignUpInput } from '@xapp/shared/interfaces';
import { Match } from '@xapp/api/core';

@JSONSchema({
	description: 'A user signup object',
	example: { id: '123' },
})
export class SignUpInput implements ISignUpInput {
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(254)
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@MaxLength(150)
	@ApiProperty()
	username: string;

	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	// @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
	password: string;

	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	@Match('password', {message: 'password and confirm password don\'t match'} )
	confirmPassword: string;

	@MaxLength(30)
	@IsOptional()
	firstName?: string = undefined;

	@MaxLength(30)
	@IsOptional()
	lastName?: string = undefined;
}
