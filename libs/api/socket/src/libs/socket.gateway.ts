import {
	WebSocketServer,
	WebSocketGateway,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
} from '@nestjs/websockets';
import { forwardRef, Inject, Logger, UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { WsGuard } from './ws.guard';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	public server: Server;
	clients: Socket[] = [];
	private logger: Logger = new Logger('AppGateway');

	constructor(
		// @Inject(forwardRef(() => SocketService))
		private readonly socketService: SocketService,
	) {}

	afterInit(server: Server) {
		this.socketService.server = server;
		this.logger.log('Init');
		server.emit('task-template:read', { do: 'stuff' });
	}

	async handleConnection(client: Socket, ...args: any[]): Promise<void> {
		const message = `Client ${client.id} has been connected`;
		this.logger.log(message);
		this.clients.push(client);
		this.socketService.join(client);

		client.emit('user:connected', { clientId: client.id });
	}

	async handleDisconnect(client: Socket) {
		const message = `Client ${client.id} was disconnected`;
		this.logger.log(message);
		client.emit('user:disconnected');
	}

	@UseGuards(WsGuard)
	@SubscribeMessage('events')
	onEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any): any {
		return data;
	}

	emit(event: string, data: any) {
		for (let c of this.clients) {
			c.emit(event, data);
		}
	}
}
