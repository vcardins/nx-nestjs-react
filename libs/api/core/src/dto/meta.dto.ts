import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
	@ApiProperty({ type: Number })
	pageSize: number;

	@ApiProperty({ type: Number })
	totalPages: number;

	@ApiProperty({ type: Number })
	totalResults: number;

	@ApiProperty({ type: Number })
	currentPage: number;
}
