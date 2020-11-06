import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserDto } from '../dto/user.dto';

export class UserOutput {
	@Type(() => UserDto)
	@ApiProperty({ type: UserDto })
	user: UserDto;
}
