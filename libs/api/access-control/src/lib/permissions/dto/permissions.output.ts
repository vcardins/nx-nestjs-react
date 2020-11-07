import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MetaDto } from '@xapp/api/core';

import { PermissionDto } from '../dto/permission.dto';

export class PermissionsOutput {
	@Type(() => PermissionDto)
	@ApiProperty({ type: PermissionDto, isArray: true })
	data: PermissionDto[];

	@Type(() => MetaDto)
	@ApiProperty({ type: MetaDto })
	meta: MetaDto;
}
