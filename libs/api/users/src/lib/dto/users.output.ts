import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '@xapp/api/core';

import { UserDto } from '../dto/user.dto';

export class UsersOutput {
	@Type(() => UserDto)
	@ApiProperty({ type: UserDto, isArray: true })
	users: UserDto[];

	@Type(() => MetaDto)
	@ApiProperty({ type: MetaDto })
	meta: MetaDto;
}
