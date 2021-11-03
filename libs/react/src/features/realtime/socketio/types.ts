import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { IRealTimeService } from '../IRealTimeService';

export enum ConnectionState {
	Connecting = 'connecting',
	Connected = 'connected',
	Disconnected = 'disconnected',
	Reconnecting = 'reconnecting',
}

export type IoNamespace = string;

export type IoConnection = Socket;

export type SocketWithNamespace<T extends Socket = Socket> = T & {
	namespaceKey: string;
};

type CreateConnectionFuncOptions = Partial<ManagerOptions & SocketOptions> & {
	enabled?: boolean;
} | undefined;

type UseSocketOptions<I> = CreateConnectionFuncOptions & I;

export interface ISocketServiceProps<I> {
	namespace?: string | UseSocketOptions<I>;
	options?: UseSocketOptions<I>;
	onSubscribe?: (instance: IRealTimeService) => void;
}
