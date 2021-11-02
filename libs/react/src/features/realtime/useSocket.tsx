import { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import SocketMock from 'socket.io-mock';

import { url } from './utils';
import { IoContext } from './IoContext';
import {
	IoContextInterface,
	IoNamespace,
	SocketLikeWithNamespace,
	UseSocketOptions,
	UseSocketReturnType,
	SocketEventHandler,
	SocketEventCallback,
} from './types';
import { ConnectionState } from '.';

export function useSocket<I extends Record<string, any>, T extends Socket = Socket>(
	options?: UseSocketOptions<I>
): UseSocketReturnType;

export function useSocket<I extends Record<string, any>, T extends Socket = Socket>(
	namespace: IoNamespace,
	options?: UseSocketOptions<I>,
	defaultHandlers?: SocketEventHandler
): UseSocketReturnType;

export function useSocket<I extends Record<string, any>, T extends Socket = Socket>(
	namespace?: string | UseSocketOptions<I>,
	options?: UseSocketOptions<I>,
	defaultHandlers?: SocketEventHandler
): UseSocketReturnType {
	const opts = {
		namespace: typeof namespace === 'string' ? namespace : '',
		options: typeof namespace === 'object' ? namespace : options,
	};
	const urlConfig = url(opts.namespace, opts.options?.path || '/socket.io');
	const connectionKey = urlConfig.id;
	const namespaceKey = `${connectionKey}${urlConfig.path}`;
	const enabled = opts.options?.enabled === undefined || opts.options.enabled;

	const { getStatus, createConnection, getError } = useContext<IoContextInterface<SocketLikeWithNamespace<T>>>(IoContext);
	const status = getStatus(namespaceKey);
	const error = getError(namespaceKey);
	const [socket, setSocket] = useState<SocketLikeWithNamespace>(new SocketMock());
	const [connected, setConnected] = useState<boolean>(false);
	const [handlers, setHandlers] = useState<SocketEventHandler>(defaultHandlers || {});

	useEffect(() => {
		switch (status) {
			case ConnectionState.Connected:
				setConnected(true);
				break;
			case ConnectionState.Disconnected:
				socket.removeAllListeners();
				setConnected(false);
				break;
			default:
				break;
		}
	}, [status]);

	useEffect(() => {
		if (enabled) {
			const { socket: _socket, cleanup } = createConnection(urlConfig, opts.options)!;
			_socket.onAny(handleEvent);
			setSocket(_socket);

			return cleanup;
		}
		return () => {};
	}, [enabled]);

	useEffect(() => {
		console.log('Handlers', handlers);
	}, [handlers]);

	return {
		socket,
		connected,
		error,
		on: addEventListener,
		off: removeEventListener,
		emit: socket.emit
	};

	function handleEvent(event: string, data: { userId?: string; [key: string]: any }) {
		let eventHandlers = handlers?.[event];
		console.log('HandleEvent', event, handlers);
		eventHandlers?.(data);
	}

	function addEventListener(event: string, callback: (args: any) => void) {
		let newHandler = (handlers[event] || { [event]: null }) as SocketEventCallback;
		newHandler = callback

		setHandlers((prevState) => ({
			...prevState,
			[event]: newHandler,
		}));
	}

	function removeEventListener(event: string, callback?: (args: any) => void) {
		let eventHandlers = handlers[event];

		// delete eventHandlers[event];

		setHandlers((prevState) => ({
			...prevState,
			eventHandlers,
		}))
	}
}
