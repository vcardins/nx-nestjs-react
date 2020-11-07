import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { MetaDto } from '@xapp/api/core';

import { GroupWithPermissionsDto } from '../dto/group-with-permissions.dto';

export class GroupsOutput {
	@Type(() => GroupWithPermissionsDto)
	@ApiProperty({ type: GroupWithPermissionsDto, isArray: true })
	data: GroupWithPermissionsDto[];

	@Type(() => MetaDto)
	@ApiProperty({ type: MetaDto })
	meta: MetaDto;
}
