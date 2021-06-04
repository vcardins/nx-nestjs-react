import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { ISignedUserOutput } from '@xapp/shared/auth';

import { GroupWithPermissionsDto } from '@xapp/api/access-control';
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

	@Type(() => GroupWithPermissionsDto)
	@ApiProperty({ type: GroupWithPermissionsDto, isArray: true })
	groups: GroupWithPermissionsDto[];

	@Type(() => UserProfileDto)
	@ApiProperty({ type: UserProfileDto })
	profile: UserProfileDto;
}
