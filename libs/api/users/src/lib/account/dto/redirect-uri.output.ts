import { ApiProperty } from '@nestjs/swagger';
import { IRedirectUriOutput } from '@xapp/shared/auth';

export class RedirectUriOutput implements IRedirectUriOutput {
	@ApiProperty()
	// eslint-disable-next-line camelcase
	redirect_uri: string;
}
