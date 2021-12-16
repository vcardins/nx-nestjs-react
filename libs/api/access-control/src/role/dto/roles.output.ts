import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { MetaDto } from '@xapp/api/core';

import { RoleWithPermissionsDto } from '../dto/role-with-permissions.dto';

export class UserRolesOutput {
	@Type(() => RoleWithPermissionsDto)
	@ApiProperty({ type: RoleWithPermissionsDto, isArray: true })
	data: RoleWithPermissionsDto[];

	@Type(() => MetaDto)
	@ApiProperty({ type: MetaDto })
	meta: MetaDto;
}
