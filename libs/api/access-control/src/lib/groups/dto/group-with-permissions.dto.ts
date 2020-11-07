import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';

import { IGroupWithPermissions } from '@xapp/shared/interfaces';
import { PermissionDto } from '../../permissions/dto/permission.dto';

export class GroupWithPermissionsDto implements IGroupWithPermissions {
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
