import { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { url } from './utils';

export enum ConnectionState {
	Connecting = 'connecting',
	Connected = 'connected',
	Disconnected = 'disconnected',
	Reconnecting = 'reconnecting',
}

export type IoNamespace = string;

export type IoConnection = Socket;

export type SocketEventCallback<T = any> = (args: T) => void;

export type SocketEventHandler<T = any> = Record<string, SocketEventCallback<T>>;

export type SocketLikeWithNamespace<T extends Socket = Socket> = T & {
	namespaceKey: string;
};

export type CreateConnectionFuncReturnType<T extends Socket = Socket> = {
	socket: SocketLikeWithNamespace<T>;
	cleanup: () => void;
};

type CreateConnectionFuncOptions = Partial<ManagerOptions & SocketOptions> & {
	enabled?: boolean;
} | undefined;

export type CreateConnectionFunc<T extends Socket = Socket> = (
	urlConfig: ReturnType<typeof url>,
	options?: CreateConnectionFuncOptions
) => CreateConnectionFuncReturnType<T> | undefined;

export type GetConnectionFunc<T extends Socket> = (namespace?: IoNamespace) => T | undefined;

export type IoContextInterface<T extends Socket> = {
	createConnection: CreateConnectionFunc<T>;
	getConnection: GetConnectionFunc<T>;
	getLastMessage: (namespace: string, event: string) => any;
	setLastMessage: (namespace: string, event: string, message: any) => void;
	subscribe: (namespace: string, event: string) => void;
	getError: (namespace: string) => any;
	setError: (namespace: string, error: any) => void;
	getStatus: (namespace: string) => ConnectionState;
};

export type UseSocketOptions<I> = CreateConnectionFuncOptions & I;

export type UseSocketReturnType = {
	socket: SocketLikeWithNamespace;
	connected: boolean;
	error: any;
	on?: (event: string, callback: (args: any) => void) => void;
	off?: (event: string, callback?: (args: any) => void) => void;
	emit?: (event: string, data: any) => void;
};
