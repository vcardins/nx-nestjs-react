import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountDto } from '@xapp/api/users';

export class UserTokenOutput {
	@ApiProperty()
	// eslint-disable-next-line camelcase
	access_token: string;

	@Type(() => AccountDto)
	@ApiProperty({ type: AccountDto })
	user: AccountDto;
}
