import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

import { ISignInInput } from '@xapp/shared/interfaces';

export class SignInInput implements ISignInInput {
	@IsNotEmpty()
	@MaxLength(150)
	@ApiProperty()
	email: string;

	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	password: string;
}
