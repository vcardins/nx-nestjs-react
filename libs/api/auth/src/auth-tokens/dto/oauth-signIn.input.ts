import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IOAuthSignInInput } from '@xapp/shared/interfaces';

export class OAuthSignInInput implements IOAuthSignInInput {
	@IsNotEmpty()
	@ApiProperty()
	code: string;
}
