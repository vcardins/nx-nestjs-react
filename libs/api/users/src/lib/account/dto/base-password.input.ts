import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength/*,Matches*/ } from 'class-validator';

export abstract class BasePasswordInput {
	@IsNotEmpty()
	@MaxLength(128)
	@ApiProperty()
	// @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
	password: string;
}
