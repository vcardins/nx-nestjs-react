import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupWithPermissionsDto } from '../dto/group-with-permissions.dto';

export class GroupOutput {
	@Type(() => GroupWithPermissionsDto)
	@ApiProperty({ type: GroupWithPermissionsDto })
	group: GroupWithPermissionsDto;
}
