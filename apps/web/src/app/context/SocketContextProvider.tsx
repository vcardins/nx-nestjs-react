import React, { FC, Context, createContext, useEffect, useState, useContext } from 'react'; // , Dispatch, useReducer
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';

import { appConfig } from '@xapp/shared/config';
import { useAuth } from '@xapp/react/auth';

type ISocketContext = Socket | null;

const SocketContext: Context<ISocketContext> = createContext(null);

interface ISocketContextProviderProps {
	children: React.ReactNode;
}

const socketConfig = {
	path: appConfig.apiMeta.websocketEndpoint,
	transports: ['websocket'],
};

const SocketContextProvider: FC<ISocketContextProviderProps> = ({ children }: ISocketContextProviderProps) => {
	// const [state, dispatch] = useReducer(mainReducer, initialState);
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const { accessToken } = useAuth();
	const [socket, setSocket] = useState<ReturnType<typeof io>>(null);

	useEffect(() => {
		const updatedSocket = io(appConfig.apiMeta.websocketEndpoint, {
			...socketConfig,
			query: accessToken ? { token: accessToken } : undefined,
		});

		updatedSocket.connect();
		// on reconnection, reset the transports option, as the Websocket
		// connection may have failed (caused by proxy, firewall, browser, ...)
		updatedSocket.on('reconnect_attempt', () => {
			updatedSocket.io.opts.transports = ['polling', 'websocket'];
		});

		// const getSocketListener = (module: string) =>
		// 	socket.on('events', (data: any) => {
		// 		switch (data.module) {
		// 			case 'todo':
		// 				return (action: string)
		// 		}
		// 	});

		updatedSocket
			// eslint-disable-next-line no-console
			.on('disconnect', () => console.log('Disconnected'))
			.on('exception', (data: any) => toast.info('Event', data))
			.on('connected', (data: any) => {
				toast.info('Connected client', data.clientId);
			})
			.on('events', (data: any) => {
				toast.info(data);
			});

		setSocket(updatedSocket);

		return () => {
			socket?.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken, setSocket, socket?.disconnect]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

const useSocket = () => useContext(SocketContext);

export { SocketContextProvider, SocketContext as socketContext, useSocket };
