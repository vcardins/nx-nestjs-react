import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IForgotPasswordInput } from '@xapp/shared/types';

@JSONSchema({
	description: 'A forgot password object',
})
export class ForgotPasswordInput implements IForgotPasswordInput {
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(254)
	@ApiProperty()
	email: string;
}
