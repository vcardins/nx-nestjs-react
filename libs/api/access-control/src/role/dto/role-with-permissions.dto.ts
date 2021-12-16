import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';

import { IRoleWithPermissions } from '@xapp/shared/types';
import { PermissionDto } from '../../permission/dto/permission.dto';

export class RoleWithPermissionsDto implements IRoleWithPermissions {
	@ApiProperty({ type: Number })
	id: number;

	@MaxLength(100)
	@ApiProperty()
	name: string;

	@MaxLength(255)
	@ApiProperty()
	title: string;

	@Type(() => PermissionDto)
	@ApiProperty({ type: PermissionDto, isArray: true })
	permissions: PermissionDto[];
}
