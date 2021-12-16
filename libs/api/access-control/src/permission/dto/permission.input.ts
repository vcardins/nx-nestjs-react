import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, MaxLength } from 'class-validator';
import { Resources } from '@xapp/shared/types';

export class PermissionInput {
	@IsOptional()
	id: number;

	@MaxLength(100)
	@ApiProperty()
	name: string;

	@MaxLength(255)
	@ApiProperty()
	title: string;

	@ApiProperty()
	resource: Resources;
}
