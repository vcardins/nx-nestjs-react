import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { Resources } from '@xapp/shared/types';

@Injectable()
export class SocketService {
	connectedUsers = new Map<string, any>();
	public server: Server;
	constructor() {}

	join(client: Socket) {
		const token = client.handshake.query['token'];
		this.connectedUsers.set(client.id, token);
	}

	emit(resource: Resources, action: string, data: any) {
		const event = `${resource}:${action}`;
		this.server.to('/').emit(event, data);
	}
}
