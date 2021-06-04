import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { ISignInInput } from '@xapp/shared/auth';
import { BasePasswordInput } from './base-password.input';

@JSONSchema({
	description: 'A user signup object',
	example: { id: '123' },
})
export class ReopenAccountInput extends BasePasswordInput implements ISignInInput {
	@IsNotEmpty()
	@IsEmail()
	@MaxLength(254)
	@ApiProperty()
	email: string;
}
