import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleWithPermissionsDto } from '@xapp/api/access-control';

import { UserDto } from '../../dto/user.dto';

export class AccountDto extends UserDto {
	@Type(() => RoleWithPermissionsDto)
	@ApiProperty({ type: RoleWithPermissionsDto, isArray: true })
	roles: RoleWithPermissionsDto[];
}
