import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { ISignedUserOutput } from '@xapp/shared/types';

import { RoleWithPermissionsDto } from '@xapp/api/access-control';
import { UserProfileDto } from '@xapp/api/users';

export class SignInOutput implements ISignedUserOutput {
	@ApiProperty({ type: Number })
	id: number;

	@ApiPropertyOptional({ type: String })
	lastLogin: Date;

	@ApiPropertyOptional({ type: Boolean })
	isSuperuser: boolean;

	@MaxLength(150)
	@ApiProperty()
	username: string;

	@MaxLength(254)
	@ApiProperty()
	email: string;

	@ApiPropertyOptional({ type: Boolean })
	isActive: boolean;

	@ApiProperty({ type: String })
	dateJoined: Date;

	@Type(() => RoleWithPermissionsDto)
	@ApiProperty({ type: RoleWithPermissionsDto, isArray: true })
	roles: RoleWithPermissionsDto[];

	@Type(() => UserProfileDto)
	@ApiProperty({ type: UserProfileDto })
	profile: UserProfileDto;
}
