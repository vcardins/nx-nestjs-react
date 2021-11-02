import { useContext, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import { IoContext } from '.';
import { IoContextInterface, SocketLikeWithNamespace } from './types';

export const useSocketEvent = <T extends unknown>(socket: SocketLikeWithNamespace, event: string) => {
	const ioContext = useContext<IoContextInterface<Socket>>(IoContext);
	const { subscribe, getLastMessage } = ioContext;
	const lastMessage = getLastMessage(socket.namespaceKey, event) as T;
	const sendMessage = (message: any) => socket.emit(event, message);

	useEffect(() => {
		subscribe(socket.namespaceKey, event);
	}, [socket]);

	return { lastMessage, sendMessage, socket };
};
