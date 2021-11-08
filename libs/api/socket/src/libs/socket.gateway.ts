import {
	WebSocketServer,
	WebSocketGateway,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtTokenService } from '@xapp/api/auth';
import { IJwtPayload } from '@xapp/shared/types';

import { WsGuard } from './ws.guard';

interface SocketWithUserData extends Socket {
	userData: IJwtPayload
}

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class BaseSocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	public server: Server;
	connectedUsers: Set<number> = new Set();
	clients: Socket[] = [];
	protected logger: Logger = new Logger();

	constructor(protected jwtService: JwtTokenService) {}

	afterInit(server: Server) {
		// this.socketService.server = server;
		this.logger.log('Init');
	}

	getJwtPayload(client: Socket) {
		const token = client.handshake.query.token as string;
		return this.jwtService.verify(token);
	}

	@UseGuards(WsGuard)
	async handleConnection(client: SocketWithUserData, ...args: any[]): Promise<void> {
		try {
			client.userData = this.getJwtPayload(client);

			this.logger.log(`Client ${client.id} has been connected`);
			this.clients.push(client);
			this.connectedUsers.add(client.userData.id);

			client.emit('user:connected', { clientId: client.id });

			// Send list of connected users
			client.emit('users', Array.from(this.connectedUsers));

		  } catch (e) {
			this.logger.error("Socket disconnected within handleConnection() in AppGateway:", e)
			client.disconnect(true)
			return;
		  }
	}

	async handleDisconnect(client: Socket) {
		this.logger.log(`Client ${client.id} was disconnected`);
		const userData = this.getJwtPayload(client);

		this.connectedUsers.delete(userData.id);

		// Sends the new list of connected users
		this.server.emit('users', this.connectedUsers);
		client.emit('user:disconnected');
	}

	emit(event: string, data: any, roomId?: string) {
		for (let client of this.clients) {
			client.emit(event, data);
		}
	}
}
