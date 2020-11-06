import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IVerifyEmailInput } from '@xapp/shared/interfaces';

@JSONSchema({
	description: 'A verify email object',
})
export class VerifyEmailInput implements IVerifyEmailInput {
	@IsNotEmpty()
	@ApiProperty()
	key: string;
}
