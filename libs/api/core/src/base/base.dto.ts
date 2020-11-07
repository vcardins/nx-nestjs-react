import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDto {
	@ApiProperty()
	id: number;

	// @ApiProperty({ type: String, format: 'date-time' })
	// createdAt: string;

	// @ApiProperty({ type: String, format: 'date-time' })
	// updatedAt: string;
}
