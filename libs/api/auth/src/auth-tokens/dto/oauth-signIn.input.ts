import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IOAuthSignInInput } from '@xapp/shared/auth';

export class OAuthSignInInput implements IOAuthSignInInput {
	@IsNotEmpty()
	@ApiProperty()
	code: string;
}
