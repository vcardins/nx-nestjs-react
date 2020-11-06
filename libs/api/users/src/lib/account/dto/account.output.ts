import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AccountDto } from '../dto/account.dto';

export class AccountOutput {
	@Type(() => AccountDto)
	@ApiProperty({ type: AccountDto })
	user: AccountDto;
}
