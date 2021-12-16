import { ConnectedSocket, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { JwtTokenService } from '@xapp/api/auth';
import { BaseSocketGateway } from '@xapp/api/socket';

export class AppGateway extends BaseSocketGateway {
	constructor(jwtService: JwtTokenService) {
		super(jwtService)
	}

	@SubscribeMessage('events')
	onEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any): any {
		return data;
	}
}
