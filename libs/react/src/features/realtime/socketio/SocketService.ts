import io from 'socket.io-client';
import SocketMock from 'socket.io-mock';

import { IoNamespace,
	IoConnection,
	ConnectionState,
	SocketWithNamespace,
	ISocketServiceProps,
} from './types';
import { url, ParsedUrl } from '../utils';
import { IRealTimeService } from '../IRealTimeService';

export class SocketService<I extends Record<string, any>> implements IRealTimeService {
	private urlConfig: ParsedUrl;
	private connectionKey: string;
	private sockets: Record<IoNamespace, IoConnection> = {};
	private connections: Record<string, number> = {};
	private errors: Record<string, any> = {};
	private statuses: Record<IoNamespace, ConnectionState> = {};
	public subscribedKeys: Record<string, boolean> = {};
	public connected: boolean = false;

	socket: SocketWithNamespace = new SocketMock();

	constructor(private props: ISocketServiceProps<I>) {
		const namespace = typeof props.namespace === 'string' ? props.namespace : '';
		const options = typeof namespace === 'object' ? namespace : props.options;

		this.urlConfig = url(namespace, options?.path || '/socket.io');
		this.connectionKey = this.urlConfig.id;

		if (!options.enabled) {
			throw new Error('Socket is not enabled');
		}
	}

	start = () => {
		try {
			if (!(this.connectionKey in this.connections)) {
				this.connections[this.connectionKey] = 1;
			} else {
				this.connections[this.connectionKey] += 1;
			}

			const namespaceKey = `${this.connectionKey}${this.urlConfig.path}`;

			const handleConnected = (args: any) => {
				this.connected = true;
				this.statuses[namespaceKey] = ConnectionState.Connected;
			};

			const handleDisconnected = () => {
				this.statuses[namespaceKey] = ConnectionState.Disconnected;
			};

			if (this.sockets[namespaceKey]) {
				this.sockets[namespaceKey].connect();
			}

			this.socket = io(this.urlConfig.source, this.props.options) as SocketWithNamespace;
			this.props.onSubscribe(this);

			this.socket.namespaceKey = namespaceKey;
			this.sockets[namespaceKey] = this.socket;

			this.socket.on('error', (error) => this.errors[namespaceKey] = error);
			this.socket.on('connected', handleConnected);
			this.socket.on('disconnected', handleDisconnected);
		} catch (e) {
			console.error(e);
		}
	}

	stop = () => {
		this.socket?.removeAllListeners();
		if (--this.connections[this.connectionKey] === 0) {
			const socketsToClose = Object.keys(this.sockets).filter((key) => key.includes(this.connectionKey));

			for (const key of socketsToClose) {
				this.sockets[key].disconnect();
				delete this.sockets[key];
			}
		}
		this.socket = null;
	}

	on = (eventName: string, fn: (data: any) => void) => {
		this.subscribedKeys[eventName] = true;
		this.socket?.on(eventName, fn);
	}

	off = (eventName: string, fn: any = null) => {
		this.subscribedKeys[eventName] = false;
		this.socket?.off(eventName, fn);
	}

	emit = (eventName: string, data: any) => {
		this.socket?.emit(eventName, data);
	}
}
