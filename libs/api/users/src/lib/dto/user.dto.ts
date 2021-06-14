import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MaxLength } from 'class-validator';
import { UserProfileDto } from './user-profile.dto';
import { RoleDto } from '../..';

export class UserDto {
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

	@Type(() => RoleDto)
	@ApiProperty({ type: RoleDto, isArray: true })
	roles: RoleDto[];

	@Type(() => UserProfileDto)
	@ApiProperty({ type: UserProfileDto })
	profile: UserProfileDto;
}
