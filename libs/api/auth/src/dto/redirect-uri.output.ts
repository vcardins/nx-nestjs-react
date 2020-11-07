import { ApiProperty } from '@nestjs/swagger';
import { IRedirectUriOutput } from '@xapp/shared/interfaces';

export class RedirectUriOutput implements IRedirectUriOutput {
	@ApiProperty()
	// eslint-disable-next-line camelcase
	redirect_uri: string;
}
