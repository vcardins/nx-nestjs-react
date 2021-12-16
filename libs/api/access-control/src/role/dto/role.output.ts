import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RoleWithPermissionsDto } from '../dto/role-with-permissions.dto';

export class RoleOutput {
	@Type(() => RoleWithPermissionsDto)
	@ApiProperty({ type: RoleWithPermissionsDto })
	group: RoleWithPermissionsDto;
}
