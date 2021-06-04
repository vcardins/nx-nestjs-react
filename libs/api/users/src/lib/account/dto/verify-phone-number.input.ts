import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

import { IVerifyPhoneNumberInput } from '@xapp/shared/auth';

@JSONSchema({
	description: 'A verify email object',
})
export class VerifyPhoneNumberInput implements IVerifyPhoneNumberInput {
	@IsNotEmpty()
	@ApiProperty()
	code: string;
}
