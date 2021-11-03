// @ts-ignore
import $ from 'jquery';
import 'signalr';

import { IRealTimeService } from '../IRealTimeService';
import { ISignalRServiceProps } from './types';

const stateConversion: any = {
	0: 'Connecting',
	1: 'Connected',
	2: 'Reconnecting',
	4: 'Disconnected',
};

export class SignalRService implements IRealTimeService {
	private config: ISignalRServiceProps;
	private connection: any;
	hub: any;
	connected: boolean = false;

	subscribedKeys: Record<string, boolean> = {};

	constructor(config: ISignalRServiceProps) {
		if (!$.hubConnection) {
			return;
		}

		this.config = {
			logging: true,
			withCredentials: false,
			...config,
		};

		console.timeLog('Connecting to realtime listeners ...');

		this.connection = $.hubConnection(config.host);
		this.hub = this.connection.createHubProxy(config.hubName);

		if (config.authToken) {
			this.connection.qs = { Bearer: config.authToken };
		}

		this.connection.logging = config.logging;
	}

	start = async () => {
		try {
			await this.connection.start({
				withCredentials: this.config.withCredentials,
			});
			this.config.onSubscribe?.(this);
		} catch (e) {
			console.warn(e.message);
		}
	};

	stop = () => {
		// Unsubscribe registered hub handlers.
		Object.entries(this.subscribedKeys)
			.filter(([_, enabled]) => enabled)
			.map(([key, _]) => key)
			.forEach((key) => this.off(key));

		this.connection.stop();
		this.hub = null;
	};

	on = (eventName: string, fn: (data: any) => void) => {
		this.subscribedKeys[eventName] = true;
		this.hub?.on(eventName, fn);
	};

	off = (eventName: string, fn: Function = null) => {
		this.subscribedKeys[eventName] = false;
		this.hub?.off(eventName, fn);
	};

	emit = (...params: any) => {
		const args = [...params];
		let callback: Function;

		if (typeof params[params.length - 1] === 'function') {
			callback = args.pop();
		}

		this.hub?.invoke
			.apply(this.hub, args)
			.done((result: any) => {
				if (callback) {
					callback(result);
				}
			})
			.fail((e: any) => {
				console.table(e);
			});
	};
}
