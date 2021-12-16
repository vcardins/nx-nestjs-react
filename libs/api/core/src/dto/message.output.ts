import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MessageOutput {
	@Type(() => MessageOutput)
	@ApiProperty({ type: MessageOutput })
	message: string;

	constructor(message: string) {
		this.message = message;
	}
}
