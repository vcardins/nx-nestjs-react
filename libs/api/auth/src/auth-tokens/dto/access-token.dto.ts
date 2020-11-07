import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
	@ApiProperty()
	@IsNotEmpty()
	// eslint-disable-next-line camelcase
	access_token: string;
}
