import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GroupWithPermissionsDto } from '../dto/user-group-with-permissions.dto';

export class GroupOutput {
	@Type(() => GroupWithPermissionsDto)
	@ApiProperty({ type: GroupWithPermissionsDto })
	group: GroupWithPermissionsDto;
}
