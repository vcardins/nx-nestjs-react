import React from 'react';

import { IoContextInterface, ConnectionState } from './types';

export const IoContext = React.createContext<IoContextInterface<any>>({
	createConnection: () => undefined,
	getConnection: () => undefined,
	getLastMessage: () => undefined,
	setLastMessage: () => undefined,
	subscribe: () => undefined,
	getError: () => undefined,
	setError: () => undefined,
	getStatus: () => ConnectionState.Disconnected,
});
