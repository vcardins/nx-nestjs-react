/* eslint-disable immutable/no-mutation */
import {
	WebSocketGateway,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	constructor(private socketService: SocketService) {}
	@WebSocketServer() public server: Server;
	private logger: Logger = new Logger('AppGateway');

	afterInit(server: Server) {
		this.socketService.socket = server;
	}

	handleDisconnect(client: Socket) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	handleConnection(client: Socket/*, ...args: any[]*/) {
		const accessToken = client.handshake.query['token'] as string;
		const message = `Client connected: ${client.id}`;
		this.logger.log(message, accessToken);
		client.emit('onConnected', { clientId: client.id });
	}
}
