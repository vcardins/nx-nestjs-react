import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

import { IPermissionOutput } from '@xapp/shared/auth';
import { ModuleName } from '@xapp/shared/types';

export class PermissionDto implements IPermissionOutput {
	@ApiProperty({ type: Number })
	id: number;

	@MaxLength(100)
	@ApiProperty()
	name: string;

	@MaxLength(255)
	@ApiProperty()
	title: string;

	@ApiProperty({ type: String })
	module: ModuleName;
}
